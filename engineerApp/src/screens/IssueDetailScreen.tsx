import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Modal,
    Linking,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchCamera, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { apiClient } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors, Typography, BorderRadius, Spacing, getStatusConfig, getTypeConfig } from '../theme';

type IssueDetailRouteProp = RouteProp<RootStackParamList, 'IssueDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'IssueDetail'>;

export function IssueDetailScreen() {
    const route = useRoute<IssueDetailRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const [issue, setIssue] = useState(route.params.issue);
    const [isLoading, setIsLoading] = useState(false);
    const [showFixModal, setShowFixModal] = useState(false);
    const [fixImage, setFixImage] = useState<{ uri: string; fileName: string } | null>(null);

    const statusConfig = getStatusConfig(issue.status);
    const typeConfig = getTypeConfig(issue.type);

    // Status timeline
    const statusOrder = ['DETECTED', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'RESOLVED'];
    const currentStatusIndex = statusOrder.indexOf(issue.status);

    const handleMarkInProgress = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.acceptAssignment(issue.id);
            if (response.success && response.data) {
                setIssue(response.data);
                Alert.alert('Success', 'Issue marked as In Progress');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to update issue';
            Alert.alert('Error', message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenFixModal = () => {
        setFixImage(null);
        setShowFixModal(true);
    };

    const handleCaptureImage = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            cameraType: 'back',
            quality: 0.8,
            maxWidth: 1280,
            maxHeight: 1280,
            saveToPhotos: false,
        };

        launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                Alert.alert('Camera Error', response.errorMessage || 'Failed to open camera');
            } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                if (asset.uri) {
                    setFixImage({
                        uri: asset.uri,
                        fileName: asset.fileName || `fix_${Date.now()}.jpg`,
                    });
                }
            }
        });
    };

    const handleSubmitFix = async () => {
        if (!fixImage) {
            Alert.alert('Error', 'Please capture an image of the fix');
            return;
        }

        if (!user?.id) {
            Alert.alert('Error', 'User not found');
            return;
        }

        setIsLoading(true);
        try {
            const response = await apiClient.solveIssue(
                issue.id,
                user.id,
                fixImage.uri,
                fixImage.fileName
            );
            if (response.success) {
                setShowFixModal(false);
                navigation.navigate('Confirmation');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to submit fix';
            Alert.alert('Error', message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetDirections = () => {
        if (issue.latitude && issue.longitude) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${issue.latitude},${issue.longitude}`;
            Linking.openURL(url).catch(() => {
                Alert.alert('Error', 'Could not open Google Maps');
            });
        } else {
            Alert.alert('Error', 'Location coordinates not available');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    {issue.imageUrl ? (
                        <Image
                            source={{ uri: issue.imageUrl }}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.heroPlaceholder}>
                            <Text style={styles.heroPlaceholderIcon}>{typeConfig.icon}</Text>
                        </View>
                    )}
                    <View style={[styles.heroTypeBadge, { backgroundColor: typeConfig.color }]}>
                        <Text style={styles.heroTypeBadgeIcon}>{typeConfig.icon}</Text>
                        <Text style={styles.heroTypeBadgeText}>{typeConfig.label}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Status Card */}
                    <View style={styles.statusCard}>
                        <View style={[styles.statusBadgeLarge, { backgroundColor: statusConfig.bg }]}>
                            <Text style={styles.statusBadgeIcon}>{statusConfig.icon}</Text>
                            <Text style={[styles.statusBadgeLabel, { color: statusConfig.color }]}>
                                {statusConfig.label}
                            </Text>
                        </View>

                        {/* Status Timeline */}
                        <View style={styles.timeline}>
                            {statusOrder.slice(0, 4).map((status, index) => {
                                const isCompleted = index <= currentStatusIndex;
                                const isCurrent = index === currentStatusIndex;
                                const config = getStatusConfig(status);
                                return (
                                    <View key={status} style={styles.timelineItem}>
                                        <View style={[
                                            styles.timelineDot,
                                            isCompleted && { backgroundColor: config.color },
                                            isCurrent && styles.timelineDotCurrent,
                                        ]}>
                                            {isCompleted && <Text style={styles.timelineDotIcon}>✓</Text>}
                                        </View>
                                        <Text style={[
                                            styles.timelineLabel,
                                            isCompleted && { color: Colors.foreground }
                                        ]}>
                                            {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                                        </Text>
                                        {index < 3 && (
                                            <View style={[
                                                styles.timelineLine,
                                                index < currentStatusIndex && { backgroundColor: Colors.success }
                                            ]} />
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    {/* Location Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>📍 Location Details</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Ward</Text>
                            <Text style={styles.infoValue}>{issue.ward?.name || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Route</Text>
                            <Text style={styles.infoValue}>{issue.route?.name || 'N/A'}</Text>
                        </View>
                        <View style={styles.coordinatesRow}>
                            <View style={styles.coordinateBox}>
                                <Text style={styles.coordinateLabel}>Latitude</Text>
                                <Text style={styles.coordinateValue}>{issue.latitude?.toFixed(6)}</Text>
                            </View>
                            <View style={styles.coordinateBox}>
                                <Text style={styles.coordinateLabel}>Longitude</Text>
                                <Text style={styles.coordinateValue}>{issue.longitude?.toFixed(6)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.directionsButton}
                            onPress={handleGetDirections}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.directionsButtonIcon}>🧭</Text>
                            <Text style={styles.directionsButtonText}>Get Directions</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Assignment Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>📋 Assignment Info</Text>
                        {issue.assignedAt && (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Assigned</Text>
                                <Text style={styles.infoValue}>
                                    {new Date(issue.assignedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            </View>
                        )}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Created</Text>
                            <Text style={styles.infoValue}>
                                {new Date(issue.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </Text>
                        </View>
                        <View style={styles.issueIdContainer}>
                            <Text style={styles.issueIdLabel}>Issue ID</Text>
                            <Text style={styles.issueIdValue}>{issue.id}</Text>
                        </View>
                    </View>

                    {/* Status Messages */}
                    {issue.status === 'FIXED' && (
                        <View style={styles.statusMessage}>
                            <Text style={styles.statusMessageIcon}>⏳</Text>
                            <View>
                                <Text style={styles.statusMessageTitle}>Awaiting Verification</Text>
                                <Text style={styles.statusMessageText}>Admin will verify this fix soon</Text>
                            </View>
                        </View>
                    )}

                    {issue.status === 'RESOLVED' && (
                        <View style={[styles.statusMessage, styles.statusMessageResolved]}>
                            <Text style={styles.statusMessageIcon}>🎉</Text>
                            <View>
                                <Text style={styles.statusMessageTitle}>Resolved!</Text>
                                <Text style={styles.statusMessageText}>This issue has been verified and closed</Text>
                            </View>
                        </View>
                    )}

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Floating Action Buttons */}
            {(issue.status === 'ASSIGNED' || issue.status === 'IN_PROGRESS') && (
                <View style={styles.floatingButtonsContainer}>
                    {issue.status === 'ASSIGNED' && (
                        <TouchableOpacity
                            style={[styles.floatingButton, styles.floatingButtonSecondary]}
                            onPress={handleMarkInProgress}
                            disabled={isLoading}
                            activeOpacity={0.7}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={Colors.white} size="small" />
                            ) : (
                                <Text style={styles.floatingButtonText}>Start Work</Text>
                            )}
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.floatingButton, styles.floatingButtonPrimary]}
                        onPress={handleOpenFixModal}
                        disabled={isLoading}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.floatingButtonText}>Mark Fixed</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Fix Submission Modal */}
            <Modal
                visible={showFixModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFixModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Submit Fix</Text>
                        <Text style={styles.modalSubtitle}>
                            Capture a photo of the completed fix
                        </Text>

                        {/* Image Preview or Capture Button */}
                        {fixImage ? (
                            <View style={styles.imagePreviewContainer}>
                                <Image
                                    source={{ uri: fixImage.uri }}
                                    style={styles.imagePreview}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    style={styles.retakeButton}
                                    onPress={handleCaptureImage}
                                >
                                    <Text style={styles.retakeButtonText}>📷 Retake Photo</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={handleCaptureImage}
                            >
                                <Text style={styles.captureButtonIcon}>📷</Text>
                                <Text style={styles.captureButtonText}>Open Camera</Text>
                            </TouchableOpacity>
                        )}

                        {/* Modal Actions */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setShowFixModal(false)}
                                disabled={isLoading}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.modalSubmitButton,
                                    !fixImage && styles.modalSubmitButtonDisabled
                                ]}
                                onPress={handleSubmitFix}
                                disabled={!fixImage || isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={Colors.white} size="small" />
                                ) : (
                                    <Text style={styles.modalSubmitButtonText}>Submit Fix</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: Spacing['3xl'],
    },
    heroContainer: {
        height: 220,
        backgroundColor: Colors.accent,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent,
    },
    heroPlaceholderIcon: {
        fontSize: 60,
        opacity: 0.5,
    },
    heroTypeBadge: {
        position: 'absolute',
        bottom: Spacing.md,
        left: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.lg,
    },
    heroTypeBadgeIcon: {
        fontSize: 14,
        marginRight: Spacing.xs,
    },
    heroTypeBadgeText: {
        color: Colors.white,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },
    content: {
        paddingTop: Spacing.base,
        paddingHorizontal: Spacing.base,
    },
    statusCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.base,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statusBadgeLarge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.base,
    },
    statusBadgeIcon: {
        fontSize: 16,
        marginRight: Spacing.xs,
    },
    statusBadgeLabel: {
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    },
    timeline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timelineItem: {
        alignItems: 'center',
        flex: 1,
    },
    timelineDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    timelineDotCurrent: {
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    timelineDotIcon: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: Typography.fontWeight.bold,
    },
    timelineLabel: {
        fontSize: Typography.fontSize.xs,
        color: Colors.muted,
        textAlign: 'center',
    },
    timelineLine: {
        position: 'absolute',
        top: 11,
        left: '60%',
        right: '-40%',
        height: 2,
        backgroundColor: Colors.border,
        zIndex: -1,
    },
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.base,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardTitle: {
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.foreground,
        marginBottom: Spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    infoLabel: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
    },
    infoValue: {
        fontSize: Typography.fontSize.sm,
        color: Colors.foreground,
        fontWeight: Typography.fontWeight.medium,
        textAlign: 'right',
        flex: 1,
        marginLeft: Spacing.base,
    },
    coordinatesRow: {
        flexDirection: 'row',
        marginTop: Spacing.sm,
        gap: Spacing.sm,
    },
    coordinateBox: {
        flex: 1,
        backgroundColor: Colors.accent,
        borderRadius: BorderRadius.lg,
        padding: Spacing.sm,
        alignItems: 'center',
    },
    coordinateLabel: {
        fontSize: Typography.fontSize.xs,
        color: Colors.muted,
        marginBottom: 2,
    },
    coordinateValue: {
        fontSize: Typography.fontSize.sm,
        color: Colors.foreground,
        fontFamily: Typography.fontFamily.mono,
    },
    directionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.lg,
        paddingVertical: Spacing.sm,
        marginTop: Spacing.md,
    },
    directionsButtonIcon: {
        fontSize: 16,
        marginRight: Spacing.sm,
    },
    directionsButtonText: {
        color: Colors.white,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },
    issueIdContainer: {
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
    },
    issueIdLabel: {
        fontSize: Typography.fontSize.xs,
        color: Colors.muted,
        marginBottom: 2,
    },
    issueIdValue: {
        fontSize: Typography.fontSize.xs,
        color: Colors.muted,
        fontFamily: Typography.fontFamily.mono,
    },
    statusMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.warningLight,
        borderRadius: BorderRadius.lg,
        padding: Spacing.base,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.warning + '30',
    },
    statusMessageResolved: {
        backgroundColor: Colors.successLight,
        borderColor: Colors.success + '30',
    },
    statusMessageIcon: {
        fontSize: 28,
        marginRight: Spacing.md,
    },
    statusMessageTitle: {
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.foreground,
        marginBottom: 2,
    },
    statusMessageText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
    },
    floatingButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: Spacing.base,
        paddingBottom: Spacing.xl,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        gap: Spacing.sm,
    },
    floatingButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
    },
    floatingButtonPrimary: {
        backgroundColor: Colors.success,
    },
    floatingButtonSecondary: {
        backgroundColor: Colors.primary,
    },
    floatingButtonText: {
        color: Colors.white,
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
        padding: Spacing.xl,
        paddingBottom: Spacing['3xl'],
    },
    modalTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.foreground,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    modalSubtitle: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    captureButton: {
        backgroundColor: Colors.accent,
        borderRadius: BorderRadius.lg,
        padding: Spacing['3xl'],
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        marginBottom: Spacing.xl,
    },
    captureButtonIcon: {
        fontSize: 48,
        marginBottom: Spacing.sm,
    },
    captureButtonText: {
        fontSize: Typography.fontSize.md,
        color: Colors.primary,
        fontWeight: Typography.fontWeight.medium,
    },
    imagePreviewContainer: {
        marginBottom: Spacing.xl,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.sm,
    },
    retakeButton: {
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    retakeButtonText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.primary,
        fontWeight: Typography.fontWeight.medium,
    },
    modalActions: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    modalCancelButton: {
        flex: 1,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    modalCancelButtonText: {
        fontSize: Typography.fontSize.md,
        color: Colors.muted,
        fontWeight: Typography.fontWeight.medium,
    },
    modalSubmitButton: {
        flex: 1,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.success,
        alignItems: 'center',
    },
    modalSubmitButtonDisabled: {
        backgroundColor: Colors.muted,
    },
    modalSubmitButtonText: {
        fontSize: Typography.fontSize.md,
        color: Colors.white,
        fontWeight: Typography.fontWeight.semibold,
    },
});
