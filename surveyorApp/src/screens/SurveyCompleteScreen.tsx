import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Button, Card } from '../components';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'SurveyComplete'>;

export default function SurveyCompleteScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const {
        frameCount,
        assignmentId,
        routeName = 'Survey Route',
        duration = 0,
        issuesDetected = 0
    } = route.params;

    const formatDuration = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}h ${mins}m`;
        }
        if (mins > 0) {
            return `${mins}m ${secs}s`;
        }
        return `${secs}s`;
    };

    function handleGoToDashboard() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            <View style={[styles.content, { paddingTop: insets.top }]}>
                {/* Success Animation Container */}
                <View style={styles.successContainer}>
                    <View style={styles.successIconOuter}>
                        <View style={styles.successIconInner}>
                            <Text style={styles.checkIcon}>✓</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Survey Complete!</Text>
                    <Text style={styles.subtitle}>
                        Your data has been uploaded successfully
                    </Text>
                </View>

                {/* Route Name Card */}
                <Card style={styles.routeCard}>
                    <Text style={styles.routeLabel}>Route Surveyed</Text>
                    <Text style={styles.routeName}>{routeName}</Text>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>⏱️</Text>
                        <Text style={styles.statValue}>{formatDuration(duration)}</Text>
                        <Text style={styles.statLabel}>Duration</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>📷</Text>
                        <Text style={styles.statValue}>{frameCount}</Text>
                        <Text style={styles.statLabel}>Frames</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🕳️</Text>
                        <Text style={styles.statValue}>{issuesDetected}</Text>
                        <Text style={styles.statLabel}>Issues</Text>
                    </View>
                </View>

                {/* Status Card */}
                <Card style={styles.statusCard}>
                    <View style={styles.statusRow}>
                        <Text style={styles.statusIcon}>🔍</Text>
                        <View style={styles.statusContent}>
                            <Text style={styles.statusTitle}>Sent for Review</Text>
                            <Text style={styles.statusText}>
                                Our AI is analyzing the captured frames for pothole detection.
                                Detected issues will be assigned to engineers for repair.
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Info Card */}
                <Card style={styles.infoCard}>
                    <Text style={styles.infoTitle}>What happens next?</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoBullet}>1.</Text>
                        <Text style={styles.infoText}>AI analyzes frames for issues</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoBullet}>2.</Text>
                        <Text style={styles.infoText}>Issues tagged with GPS locations</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoBullet}>3.</Text>
                        <Text style={styles.infoText}>Engineers assigned for repairs</Text>
                    </View>
                </Card>
            </View>

            {/* Action Button */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
                <Button
                    title="Return to Dashboard"
                    onPress={handleGoToDashboard}
                    variant="primary"
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
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        paddingTop: spacing.xxl,
    },
    successIconOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.completedBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    successIconInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.success,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        fontSize: 36,
        color: colors.textInverse,
        fontWeight: '700',
    },
    title: {
        ...typography.heading1,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    routeCard: {
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    routeLabel: {
        ...typography.small,
        color: colors.textMuted,
        marginBottom: spacing.xs,
    },
    routeName: {
        ...typography.heading3,
        color: colors.primary,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        alignItems: 'center',
        ...shadows.sm,
    },
    statIcon: {
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    statValue: {
        ...typography.heading2,
        color: colors.textPrimary,
    },
    statLabel: {
        ...typography.small,
        color: colors.textMuted,
    },
    statusCard: {
        backgroundColor: colors.completedBg,
        borderWidth: 1,
        borderColor: colors.success,
        marginBottom: spacing.md,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
    },
    statusIcon: {
        fontSize: 28,
    },
    statusContent: {
        flex: 1,
    },
    statusTitle: {
        ...typography.bodyBold,
        color: colors.completedText,
        marginBottom: spacing.xs,
    },
    statusText: {
        ...typography.caption,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    infoCard: {
        backgroundColor: colors.surfaceAlt,
    },
    infoTitle: {
        ...typography.bodyBold,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    infoItem: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    infoBullet: {
        ...typography.caption,
        color: colors.primary,
        fontWeight: '600',
        width: 20,
    },
    infoText: {
        ...typography.caption,
        color: colors.textSecondary,
        flex: 1,
    },
    footer: {
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.sm,
    },
});
