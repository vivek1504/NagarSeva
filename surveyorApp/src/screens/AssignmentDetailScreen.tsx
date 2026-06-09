import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    StatusBar,
    Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Button, Card, Header, StatusBadge } from '../components';
import { RootStackParamList } from '../types';
import api from '../services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'AssignmentDetail'>;

export default function AssignmentDetailScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const { assignment } = route.params;
    const [loading, setLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(assignment.status);

    async function handleAccept() {
        setLoading(true);
        try {
            const response = await api.acceptAssignment(assignment.id);
            setCurrentStatus('IN_PROGRESS');
            Alert.alert('Success', 'Assignment accepted! You can now start the survey.', [
                { text: 'OK' },
            ]);
        } catch (error) {
            console.error('Accept failed:', error);
            Alert.alert('Error', 'Failed to accept assignment. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function handleStartSurvey() {
        navigation.navigate('Survey', { assignment: { ...assignment, status: currentStatus } });
    }

    function handleGetDirections() {
        const startLat = assignment.route?.startLat;
        const startLon = assignment.route?.startLon;

        if (!startLat || !startLon) {
            Alert.alert('Error', 'Route coordinates not available');
            return;
        }

        // Open Google Maps with directions to the starting point
        const url = `https://www.google.com/maps/dir/?api=1&destination=${startLat},${startLon}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'Could not open Google Maps');
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            <Header
                title="Assignment Details"
                subtitle={assignment.route?.ward?.name}
                onBack={() => navigation.goBack()}
            />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Status Card */}
                <Card style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.sectionTitle}>Current Status</Text>
                        <StatusBadge status={currentStatus} />
                    </View>
                </Card>

                {/* Route Info Card */}
                <Card>
                    <Text style={styles.sectionTitle}>Route Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Route Name</Text>
                            <Text style={styles.infoValue}>{assignment.route?.name}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Ward</Text>
                            <Text style={styles.infoValue}>{assignment.route?.ward?.name}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Distance</Text>
                            <Text style={styles.infoValue}>{assignment.route?.distance} km</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Assigned On</Text>
                            <Text style={styles.infoValue}>
                                {new Date(assignment.assignedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Map Placeholder */}
                <Card style={styles.mapCard}>
                    <Text style={styles.sectionTitle}>Route Preview</Text>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapIcon}>🗺️</Text>
                        <Text style={styles.mapText}>Map view coming soon</Text>
                        <Text style={styles.coordsText}>
                            Start: {assignment.route?.startLat?.toFixed(4) ?? 'N/A'}°, {assignment.route?.startLon?.toFixed(4) ?? 'N/A'}°
                        </Text>
                        <Text style={styles.coordsText}>
                            End: {assignment.route?.endLat?.toFixed(4) ?? 'N/A'}°, {assignment.route?.endLon?.toFixed(4) ?? 'N/A'}°
                        </Text>
                    </View>
                    <Button
                        title="📍 Get Directions"
                        onPress={handleGetDirections}
                        variant="primary"
                        style={styles.directionsBtn}
                    />
                </Card>

                {/* Instructions Card */}
                <Card>
                    <Text style={styles.sectionTitle}>Survey Instructions</Text>
                    <View style={styles.instructions}>
                        <View style={styles.instructionItem}>
                            <Text style={styles.instructionNumber}>1</Text>
                            <Text style={styles.instructionText}>
                                Accept the assignment to begin
                            </Text>
                        </View>
                        <View style={styles.instructionItem}>
                            <Text style={styles.instructionNumber}>2</Text>
                            <Text style={styles.instructionText}>
                                Travel along the route and capture road footage
                            </Text>
                        </View>
                        <View style={styles.instructionItem}>
                            <Text style={styles.instructionNumber}>3</Text>
                            <Text style={styles.instructionText}>
                                Upload captured frames for pothole detection
                            </Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>

            {/* Action Buttons */}
            <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
                {currentStatus === 'PENDING' && (
                    <Button
                        title="Accept Assignment"
                        onPress={handleAccept}
                        loading={loading}
                        variant="success"
                    />
                )}
                {currentStatus === 'IN_PROGRESS' && (
                    <Button
                        title="Start Survey"
                        onPress={handleStartSurvey}
                        variant="primary"
                    />
                )}
                {currentStatus === 'COMPLETED' && (
                    <View style={styles.completedBanner}>
                        <Text style={styles.completedText}>✓ Survey Completed</Text>
                    </View>
                )}
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
    },
    scrollContent: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    statusCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    sectionTitle: {
        ...typography.bodyBold,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    infoGrid: {
        gap: spacing.md,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    infoLabel: {
        ...typography.caption,
        color: colors.textMuted,
    },
    infoValue: {
        ...typography.caption,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    mapCard: {},
    mapPlaceholder: {
        height: 160,
        backgroundColor: colors.surfaceAlt,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapIcon: {
        fontSize: 40,
        marginBottom: spacing.sm,
    },
    mapText: {
        ...typography.body,
        color: colors.textMuted,
    },
    coordsText: {
        ...typography.small,
        color: colors.textMuted,
        marginTop: spacing.xs,
    },
    directionsBtn: {
        marginTop: spacing.md,
    },
    instructions: {
        gap: spacing.md,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
    },
    instructionNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primaryFaded,
        color: colors.primary,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '600',
        fontSize: 12,
    },
    instructionText: {
        ...typography.body,
        color: colors.textSecondary,
        flex: 1,
    },
    actions: {
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.sm,
    },
    completedBanner: {
        backgroundColor: colors.completedBg,
        padding: spacing.lg,
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    completedText: {
        ...typography.bodyBold,
        color: colors.completedText,
    },
});
