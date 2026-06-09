import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Card, StatusBadge } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { RouteAssignment, RootStackParamList } from '../types';
import api from '../services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FilterTab = 'all' | 'pending' | 'active' | 'completed';

export default function DashboardScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const { user, logout } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [assignments, setAssignments] = useState<RouteAssignment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<FilterTab>('all');

    useEffect(() => {
        loadAssignments();
    }, []);

    async function loadAssignments() {
        if (!user?.id) {
            setError('User not found');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await api.getAssignments(user.id);

            if (response.success && response.assignments) {
                setAssignments(response.assignments);
            } else {
                setError(response.message || 'Failed to load assignments');
            }
        } catch (err) {
            console.error('Failed to load assignments:', err);
            setError('Network error. Pull to refresh.');
        } finally {
            setLoading(false);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadAssignments();
        setRefreshing(false);
    }, [user?.id]);

    const filteredAssignments = assignments.filter(a => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return a.status === 'PENDING';
        if (activeTab === 'active') return a.status === 'IN_PROGRESS';
        if (activeTab === 'completed') return a.status === 'COMPLETED';
        return true;
    });

    const stats = {
        pending: assignments.filter(a => a.status === 'PENDING').length,
        active: assignments.filter(a => a.status === 'IN_PROGRESS').length,
        completed: assignments.filter(a => a.status === 'COMPLETED').length,
    };

    function renderAssignment({ item }: { item: RouteAssignment }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}
                activeOpacity={0.7}
            >
                <Card style={styles.assignmentCard}>
                    <View style={styles.assignmentHeader}>
                        <Text style={styles.routeName}>{item.route?.name}</Text>
                        <StatusBadge status={item.status} />
                    </View>
                    <View style={styles.assignmentDetails}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Ward</Text>
                            <Text style={styles.detailValue}>{item.route?.ward?.name}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Distance</Text>
                            <Text style={styles.detailValue}>{item.route?.distance} km</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Assigned</Text>
                            <Text style={styles.detailValue}>
                                {new Date(item.assignedAt).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tapHint}>
                        <Text style={styles.tapHintText}>Tap to view details →</Text>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
                <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.greeting}>Welcome,</Text>
                            <Text style={styles.userName}>{user?.name || 'Surveyor'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading assignments...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Clean Header */}
            <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greeting}>Welcome,</Text>
                        <Text style={styles.userName}>{user?.name || 'Surveyor'}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                <View style={[styles.statCard, { backgroundColor: colors.pendingBg }]}>
                    <Text style={[styles.statNumber, { color: colors.pendingText }]}>
                        {stats.pending}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.pendingText }]}>Pending</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.activeBg }]}>
                    <Text style={[styles.statNumber, { color: colors.activeText }]}>
                        {stats.active}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.activeText }]}>Active</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.completedBg }]}>
                    <Text style={[styles.statNumber, { color: colors.completedText }]}>
                        {stats.completed}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.completedText }]}>
                        Completed
                    </Text>
                </View>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                {(['all', 'pending', 'active', 'completed'] as FilterTab[]).map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Error State */}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {/* Assignment List */}
            <FlatList
                data={filteredAssignments}
                keyExtractor={item => item.id}
                renderItem={renderAssignment}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📋</Text>
                        <Text style={styles.emptyText}>No assignments found</Text>
                        <Text style={styles.emptySubtext}>Pull down to refresh</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    brandingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    emblemSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    emblemIconSmall: {
        fontSize: 18,
    },
    brandingText: {
        flex: 1,
    },
    vmcText: {
        ...typography.caption,
        color: colors.textInverse,
        fontWeight: '600',
    },
    systemText: {
        ...typography.small,
        color: 'rgba(255,255,255,0.7)',
    },
    userRow: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        paddingTop: spacing.md,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        ...typography.caption,
        color: 'rgba(255,255,255,0.8)',
    },
    userName: {
        ...typography.heading3,
        color: colors.textInverse,
    },
    logoutButton: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    logoutText: {
        ...typography.small,
        color: colors.textInverse,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        marginTop: -spacing.lg,
        gap: spacing.md,
    },
    statCard: {
        flex: 1,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        ...shadows.sm,
    },
    statNumber: {
        ...typography.heading1,
    },
    statLabel: {
        ...typography.small,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        marginTop: spacing.xl,
        gap: spacing.sm,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    activeTab: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    tabText: {
        ...typography.small,
        color: colors.textSecondary,
    },
    activeTabText: {
        color: colors.textInverse,
    },
    listContent: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    assignmentCard: {
        marginBottom: spacing.sm,
    },
    assignmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    routeName: {
        ...typography.bodyBold,
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    assignmentDetails: {
        flexDirection: 'row',
        gap: spacing.lg,
    },
    detailItem: {},
    detailLabel: {
        ...typography.small,
        color: colors.textMuted,
    },
    detailValue: {
        ...typography.caption,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    tapHint: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
    },
    tapHintText: {
        ...typography.small,
        color: colors.primary,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: spacing.xxxl,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    emptyText: {
        ...typography.body,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    emptySubtext: {
        ...typography.caption,
        color: colors.textMuted,
        marginTop: spacing.xs,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
    errorContainer: {
        backgroundColor: colors.danger + '15',
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
        padding: spacing.md,
        borderRadius: borderRadius.md,
    },
    errorText: {
        ...typography.caption,
        color: colors.danger,
        textAlign: 'center',
    },
});
