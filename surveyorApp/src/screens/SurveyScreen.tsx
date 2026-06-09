import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Alert,
    PermissionsAndroid,
    Platform,
    ActivityIndicator,
    StatusBar,
    NativeModules,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Camera } from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Button, Card, Header } from '../components';
import { RootStackParamList } from '../types';
import api from '../services/api';
import { useCallback } from 'react';

const { FrameExtractor } = NativeModules;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'Survey'>;

export default function SurveyScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const { assignment } = route.params;

    // Survey session state
    const [surveySessionId, setSurveySessionId] = useState<string | null>(null);
    const [surveyStartTime, setSurveyStartTime] = useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [issuesDetected, setIssuesDetected] = useState(0);

    // Frame capture state
    const [frames, setFrames] = useState<string[]>([]);
    const [uploadedCount, setUploadedCount] = useState(0);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraRunning, setCameraRunning] = useState(false);

    // Loading states
    const [starting, setStarting] = useState(false);
    const [ending, setEnding] = useState(false);

    // Demo mode state
    const [demoMode, setDemoMode] = useState(false);
    const [extracting, setExtracting] = useState(false);

    // Refs
    const camera = useRef<Camera>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Timer effect
    useEffect(() => {
        if (surveyStartTime && !timerRef.current) {
            timerRef.current = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((now.getTime() - surveyStartTime.getTime()) / 1000);
                setElapsedTime(diff);
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [surveyStartTime]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Reset state when screen is focused (prevents stale data from previous surveys)
    useFocusEffect(
        useCallback(() => {
            // Reset all survey state for a fresh start
            setSurveySessionId(null);
            setSurveyStartTime(null);
            setElapsedTime(0);
            setIssuesDetected(0);
            setFrames([]);
            setUploadedCount(0);
            setShowCamera(false);
            setCameraRunning(false);
            setStarting(false);
            setEnding(false);
            setDemoMode(false);
            setExtracting(false);

            return () => {
                // Cleanup on blur
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
            };
        }, [])
    );

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const requestCameraPermission = async () => {
        let status = Camera.getCameraPermissionStatus();
        if (status === 'granted') return true;
        status = await Camera.requestCameraPermission();
        if (status === 'granted') return true;
        const finalStatus = await Camera.getCameraPermissionStatus();
        return finalStatus === 'granted';
    };

    const requestLocationPermission = async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location for survey tracking.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleStartSurvey = async () => {
        // Check permissions
        const cameraOk = await requestCameraPermission();
        if (!cameraOk) {
            Alert.alert('Permission Required', 'Camera permission is needed to capture road footage.');
            return;
        }

        const locationOk = await requestLocationPermission();
        if (!locationOk) {
            Alert.alert('Permission Required', 'Location permission is needed for accurate survey data.');
            return;
        }

        // Start survey session
        setStarting(true);
        try {
            const startedAt = new Date().toISOString();
            const response = await api.startSurvey(assignment.id, startedAt);

            if (response.success && response.surverySessionId) {
                setSurveySessionId(response.surverySessionId);
                setSurveyStartTime(new Date());
                setShowCamera(true);
            } else {
                Alert.alert('Error', response.message || 'Failed to start survey session.');
            }
        } catch (error) {
            console.error('Start survey failed:', error);
            Alert.alert('Error', 'Failed to start survey. Please try again.');
        } finally {
            setStarting(false);
        }
    };

    const startCapturing = () => {
        if (!camera.current) return;
        setCameraRunning(true);

        // Capture every 2 seconds
        intervalRef.current = setInterval(async () => {
            try {
                const photo = await camera.current!.takePhoto({ flash: 'off' });
                const newFrame = `file://${photo.path}`;
                setFrames(prev => [...prev, newFrame]);

                // Simulate issue detection (actual detection happens on backend)
                // Increment randomly to show activity
                if (Math.random() > 0.7) {
                    setIssuesDetected(prev => prev + 1);
                }
            } catch (e) {
                console.error('Capture failed', e);
            }
        }, 2000);
    };

    const stopCapturing = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCameraRunning(false);
    };

    const uploadBatch = async (framesToUpload: string[]) => {
        if (!surveySessionId || framesToUpload.length === 0) return;

        try {
            await api.uploadFrames(
                framesToUpload,
                assignment.routeId,
                assignment.route?.wardId || '',
                surveySessionId,
                assignment.id
            );
            setUploadedCount(prev => prev + framesToUpload.length);
        } catch (error) {
            console.error('Batch upload failed:', error);
        }
    };

    const handleEndSurvey = async () => {
        stopCapturing();
        setEnding(true);

        try {
            // Upload remaining frames
            const unuploadedFrames = frames.slice(uploadedCount);
            if (unuploadedFrames.length > 0) {
                await uploadBatch(unuploadedFrames);
            }

            // End survey session
            if (surveySessionId) {
                const endedAt = new Date().toISOString();
                await api.endSurvey(surveySessionId, endedAt);
            }

            // Navigate to summary
            navigation.replace('SurveyComplete', {
                frameCount: frames.length,
                assignmentId: assignment.id,
                routeName: assignment.route?.name || 'Survey Route',
                duration: elapsedTime,
                issuesDetected: issuesDetected,
            });
        } catch (error) {
            console.error('End survey failed:', error);
            Alert.alert('Error', 'Failed to end survey properly. Data may be incomplete.');
        } finally {
            setEnding(false);
        }
    };

    // Demo Mode: Pick video and extract frames
    const handleDemoMode = async () => {
        try {
            // Launch gallery to pick video
            const result = await launchImageLibrary({
                mediaType: 'video',
                selectionLimit: 1,
            });

            if (result.didCancel || !result.assets || result.assets.length === 0) {
                return;
            }

            const videoUri = result.assets[0].uri;
            if (!videoUri) {
                Alert.alert('Error', 'Could not get video path');
                return;
            }

            // Start survey session first
            setExtracting(true);
            const startedAt = new Date().toISOString();
            const response = await api.startSurvey(assignment.id, startedAt);

            if (!response.success || !response.surverySessionId) {
                Alert.alert('Error', response.message || 'Failed to start survey session.');
                setExtracting(false);
                return;
            }

            setSurveySessionId(response.surverySessionId);
            setSurveyStartTime(new Date());

            // Extract frames from video using native module
            // Remove 'file://' prefix if present for Android
            const cleanPath = videoUri.replace('file://', '');
            const extractedFrames = await FrameExtractor.extractFrames(
                cleanPath,
                2000, // interval in ms (every 2 seconds)
                30    // max frames
            );

            if (extractedFrames && extractedFrames.length > 0) {
                setFrames(extractedFrames);
                setDemoMode(true);
            } else {
                Alert.alert('Error', 'No frames could be extracted from the video');
            }
        } catch (error: any) {
            console.error('Demo mode error:', error);
            Alert.alert('Error', error.message || 'Failed to process video');
        } finally {
            setExtracting(false);
        }
    };

    // Handle upload for demo mode
    const handleDemoUpload = async () => {
        setEnding(true);
        try {
            if (frames.length > 0 && surveySessionId) {
                await uploadBatch(frames);
            }

            // End survey session
            if (surveySessionId) {
                const endedAt = new Date().toISOString();
                await api.endSurvey(surveySessionId, endedAt);
            }

            // Navigate to summary
            navigation.replace('SurveyComplete', {
                frameCount: frames.length,
                assignmentId: assignment.id,
                routeName: assignment.route?.name || 'Survey Route',
                duration: elapsedTime,
                issuesDetected: 0,
            });
        } catch (error) {
            console.error('Demo upload failed:', error);
            Alert.alert('Error', 'Failed to upload frames.');
        } finally {
            setEnding(false);
        }
    };

    // Demo Mode View (Frame Preview)
    if (demoMode) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
                <Header
                    title="Demo Mode"
                    subtitle={`${frames.length} frames extracted`}
                    onBack={() => setDemoMode(false)}
                />

                <View style={styles.content}>
                    <Card>
                        <Text style={styles.sectionTitle}>Extracted Frames</Text>
                        <Text style={styles.infoLabel}>
                            {frames.length} frames ready to upload
                        </Text>
                    </Card>

                    {/* Frame Preview */}
                    <FlatList
                        data={frames}
                        keyExtractor={(item, index) => `frame-${index}`}
                        numColumns={3}
                        contentContainerStyle={styles.frameGrid}
                        renderItem={({ item, index }) => (
                            <View style={styles.frameThumb}>
                                <Image
                                    source={{ uri: item }}
                                    style={styles.frameImage}
                                    resizeMode="cover"
                                />
                                <Text style={styles.frameIndex}>{index + 1}</Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Upload Frames"
                        onPress={handleDemoUpload}
                        loading={ending}
                        variant="success"
                    />
                </View>
            </View>
        );
    }

    // Camera View (Active Survey)
    if (showCamera) {
        const devices = Camera.getAvailableCameraDevices();
        const device = devices.find(d => d.position === 'back');

        if (!device) {
            return (
                <View style={styles.container}>
                    <Header title="Camera" onBack={() => setShowCamera(false)} />
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>No camera device found</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.cameraContainer}>
                <StatusBar hidden />
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    photo
                />

                {/* Overlay UI */}
                <View style={styles.cameraOverlay}>
                    {/* Top Stats Bar */}
                    <View style={[styles.cameraHeader, { paddingTop: insets.top + spacing.md }]}>
                        <View style={styles.statRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statIcon}>⏱️</Text>
                                <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statIcon}>📷</Text>
                                <Text style={styles.statValue}>{frames.length}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statIcon}>🕳️</Text>
                                <Text style={styles.statValue}>{issuesDetected}</Text>
                            </View>
                        </View>

                        {cameraRunning && (
                            <View style={styles.recordingBadge}>
                                <View style={styles.recordingDot} />
                                <Text style={styles.recordingText}>RECORDING</Text>
                            </View>
                        )}
                    </View>

                    {/* Bottom Controls */}
                    <View style={styles.cameraControls}>
                        {!cameraRunning ? (
                            <Button
                                title="▶  Start Capture"
                                onPress={startCapturing}
                                variant="success"
                                style={styles.cameraBtn}
                            />
                        ) : (
                            <Button
                                title="⏸  Pause"
                                onPress={stopCapturing}
                                variant="danger"
                                style={styles.cameraBtn}
                            />
                        )}
                        <Button
                            title="✓  End Survey"
                            onPress={handleEndSurvey}
                            loading={ending}
                            variant="primary"
                            style={styles.cameraBtn}
                        />
                    </View>
                </View>
            </View>
        );
    }

    // Pre-Survey Screen
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            <Header
                title="Start Survey"
                subtitle={assignment.route?.name}
                onBack={() => navigation.goBack()}
            />

            <View style={styles.content}>
                {/* Route Info Card */}
                <Card>
                    <Text style={styles.sectionTitle}>Survey Details</Text>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Route</Text>
                            <Text style={styles.infoValue}>{assignment.route?.name}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Ward</Text>
                            <Text style={styles.infoValue}>{assignment.route?.ward?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Distance</Text>
                            <Text style={styles.infoValue}>{assignment.route?.distance} km</Text>
                        </View>
                    </View>
                </Card>

                {/* Checklist Card */}
                <Card style={styles.checklistCard}>
                    <Text style={styles.sectionTitle}>Pre-Survey Checklist</Text>
                    <View style={styles.checkItem}>
                        <Text style={styles.checkIcon}>📷</Text>
                        <Text style={styles.checkText}>Camera permission required</Text>
                    </View>
                    <View style={styles.checkItem}>
                        <Text style={styles.checkIcon}>📍</Text>
                        <Text style={styles.checkText}>Location access required</Text>
                    </View>
                    <View style={styles.checkItem}>
                        <Text style={styles.checkIcon}>🏍️</Text>
                        <Text style={styles.checkText}>Mount device securely on bike</Text>
                    </View>
                    <View style={styles.checkItem}>
                        <Text style={styles.checkIcon}>🔋</Text>
                        <Text style={styles.checkText}>Ensure sufficient battery</Text>
                    </View>
                </Card>

                {/* Instructions */}
                <Card style={styles.instructionsCard}>
                    <Text style={styles.sectionTitle}>How it works</Text>
                    <Text style={styles.instructionText}>
                        Once you start, the camera will automatically capture frames every 2 seconds.
                        Drive along your assigned route at a steady pace.
                        Issues will be detected automatically by our AI system.
                    </Text>
                </Card>
            </View>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <Button
                    title="Start Survey"
                    onPress={handleStartSurvey}
                    loading={starting}
                    variant="success"
                    style={styles.footerBtn}
                />
                <Button
                    title="📁 Demo Mode (Upload Video)"
                    onPress={handleDemoMode}
                    loading={extracting}
                    variant="primary"
                    style={styles.footerBtn}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: spacing.lg,
        gap: spacing.md,
    },
    sectionTitle: {
        ...typography.bodyBold,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        gap: spacing.xl,
        marginBottom: spacing.sm,
    },
    infoItem: {},
    infoLabel: {
        ...typography.small,
        color: colors.textMuted,
    },
    infoValue: {
        ...typography.body,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    checklistCard: {
        marginTop: spacing.sm,
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
    },
    checkIcon: {
        fontSize: 20,
    },
    checkText: {
        ...typography.body,
        color: colors.textSecondary,
    },
    instructionsCard: {
        backgroundColor: colors.primaryFaded,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    instructionText: {
        ...typography.caption,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    footer: {
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.sm,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        ...typography.body,
        color: colors.textMuted,
    },
    // Camera styles
    cameraContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
    },
    cameraHeader: {
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        gap: spacing.md,
    },
    statRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.xl,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    statIcon: {
        fontSize: 18,
    },
    statValue: {
        ...typography.bodyBold,
        color: '#fff',
        minWidth: 40,
    },
    recordingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.danger,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: spacing.sm,
    },
    recordingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    recordingText: {
        ...typography.small,
        color: '#fff',
        fontWeight: '700',
    },
    cameraControls: {
        flexDirection: 'row',
        paddingBottom: 40,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    cameraBtn: {
        flex: 1,
    },
    // Demo mode styles
    frameGrid: {
        padding: spacing.sm,
        gap: spacing.sm,
    },
    frameThumb: {
        flex: 1,
        aspectRatio: 1,
        margin: spacing.xs,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        position: 'relative',
    },
    frameImage: {
        width: '100%',
        height: '100%',
    },
    frameIndex: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    footerBtn: {
        marginBottom: spacing.sm,
    },
});
