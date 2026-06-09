import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    Alert,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Issue } from '../types';
import { apiClient } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Colors, Typography, BorderRadius, Shadows, Spacing, getStatusConfig, getTypeConfig } from '../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Issues'>;

type FilterTab = 'ALL' | 'ASSIGNED' | 'IN_PROGRESS' | 'FIXED';

export function IssuesScreen() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
    const navigation = useNavigation<NavigationProp>();
    const { logout, user } = useAuth();

    const fetchIssues = useCallback(async () => {
        try {
            const data = await apiClient.getAssignedIssues();
            setIssues(data);
            filterIssues(data, activeFilter);
        } catch (error: any) {
            if (error.response?.status !== 401) {
                Alert.alert('Error', 'Failed to fetch issues. Pull down to retry.');
            }
        }
    }, [activeFilter]);

    const filterIssues = (data: Issue[], filter: FilterTab) => {
        if (filter === 'ALL') {
            setFilteredIssues(data);
        } else {
            setFilteredIssues(data.filter(issue => issue.status === filter));
        }
    };

    const handleFilterChange = (filter: FilterTab) => {
        setActiveFilter(filter);
        filterIssues(issues, filter);
    };

    useEffect(() => {
        loadIssues();
    }, []);

    const loadIssues = async () => {
        setIsLoading(true);
        await fetchIssues();
        setIsLoading(false);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchIssues();
        setIsRefreshing(false);
    };

    const handleAcceptIssue = async (issue: Issue) => {
        try {
            await apiClient.acceptAssignment(issue.id);
            Alert.alert('Success', 'Issue accepted! Status changed to In Progress.');
            handleRefresh();
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to accept issue';
            Alert.alert('Error', message);
        }
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: logout },
        ]);
    };

    const getStats = () => {
        const assigned = issues.filter(i => i.status === 'ASSIGNED').length;
        const inProgress = issues.filter(i => i.status === 'IN_PROGRESS').length;
        const fixed = issues.filter(i => i.status === 'FIXED' || i.status === 'RESOLVED').length;
        return { total: issues.length, assigned, inProgress, fixed };
    };

    const stats = getStats();

    const renderIssueCard = ({ item }: { item: Issue }) => {
        const statusConfig = getStatusConfig(item.status);
        const typeConfig = getTypeConfig(item.type);

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('IssueDetail', { issue: item })}
                activeOpacity={0.7}
            >
                {/* Image thumbnail */}
                <View style={styles.cardImageContainer}>
                    {item.imageUrl ? (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.cardImagePlaceholder}>
                            <Text style={styles.cardImagePlaceholderIcon}>{typeConfig.icon}</Text>
                        </View>
                    )}
                    <View style={[styles.typeBadge, { backgroundColor: typeConfig.color }]}>
                        <Text style={styles.typeBadgeText}>{typeConfig.label}</Text>
                    </View>
                </View>

                {/* Card content */}
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                            <Text style={styles.statusIcon}>{statusConfig.icon}</Text>
                            <Text style={[styles.statusText, { color: statusConfig.color }]}>
                                {item.status.replace('_', ' ')}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.cardDetails}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailIcon}>📍</Text>
                            <Text style={styles.detailText} numberOfLines={1}>
                                {item.ward?.name || 'Unknown Ward'}
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailIcon}>🛣️</Text>
                            <Text style={styles.detailText} numberOfLines={1}>
                                {item.route?.name || 'Unknown Route'}
                            </Text>
                        </View>
                        {item.assignedAt && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailIcon}>📅</Text>
                                <Text style={styles.detailText}>
                                    {new Date(item.assignedAt).toLocaleDateString()}
                                </Text>
                            </View>
                        )}
                    </View>

                    {item.status === 'ASSIGNED' && (
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => handleAcceptIssue(item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.acceptButtonText}>Start Work</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>Loading issues...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.greeting}>Welcome,</Text>
                            <Text style={styles.userName}>{user?.name || 'Engineer'}</Text>
                        </View>
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Stats Cards */}
                    <View style={styles.statsContainer}>
                        <View style={[styles.statCard, styles.statCardTotal]}>
                            <Text style={styles.statValue}>{stats.total}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                        <View style={[styles.statCard, styles.statCardPending]}>
                            <Text style={[styles.statValue, { color: Colors.assigned }]}>{stats.assigned}</Text>
                            <Text style={styles.statLabel}>Pending</Text>
                        </View>
                        <View style={[styles.statCard, styles.statCardProgress]}>
                            <Text style={[styles.statValue, { color: Colors.primary }]}>{stats.inProgress}</Text>
                            <Text style={styles.statLabel}>Active</Text>
                        </View>
                        <View style={[styles.statCard, styles.statCardDone]}>
                            <Text style={[styles.statValue, { color: Colors.success }]}>{stats.fixed}</Text>
                            <Text style={styles.statLabel}>Done</Text>
                        </View>
                    </View>

                    {/* Filter Tabs */}
                    <View style={styles.filterContainer}>
                        {(['ALL', 'ASSIGNED', 'IN_PROGRESS', 'FIXED'] as FilterTab[]).map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterTab,
                                    activeFilter === filter && styles.filterTabActive
                                ]}
                                onPress={() => handleFilterChange(filter)}
                            >
                                <Text style={[
                                    styles.filterTabText,
                                    activeFilter === filter && styles.filterTabTextActive
                                ]}>
                                    {filter === 'ALL' ? 'All' : filter === 'IN_PROGRESS' ? 'Active' : filter.charAt(0) + filter.slice(1).toLowerCase()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Issues List */}
                <FlatList
                    data={filteredIssues}
                    renderItem={renderIssueCard}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            tintColor={Colors.primary}
                            colors={[Colors.primary]}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>📋</Text>
                            <Text style={styles.emptyText}>
                                {activeFilter === 'ALL'
                                    ? 'No issues assigned yet'
                                    : `No ${activeFilter.toLowerCase().replace('_', ' ')} issues`}
                            </Text>
                            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    loadingText: {
        color: Colors.muted,
        marginTop: Spacing.base,
        fontSize: Typography.fontSize.md,
    },
    header: {
        paddingTop: Spacing.base,
        paddingHorizontal: Spacing.base,
        paddingBottom: Spacing.base,
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.base,
    },
    greeting: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
    },
    userName: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.foreground,
    },
    logoutButton: {
        paddingHorizontal: Spacing.base,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.destructive,
    },
    logoutText: {
        color: Colors.destructive,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.base,
    },
    statCard: {
        flex: 1,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statCardTotal: {
        backgroundColor: Colors.accent,
    },
    statCardPending: {
        backgroundColor: Colors.assignedLight,
    },
    statCardProgress: {
        backgroundColor: Colors.inProgressLight,
    },
    statCardDone: {
        backgroundColor: Colors.successLight,
    },
    statValue: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.foreground,
    },
    statLabel: {
        fontSize: Typography.fontSize.xs,
        color: Colors.muted,
        marginTop: 2,
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.accent,
        borderRadius: BorderRadius.lg,
        padding: 3,
    },
    filterTab: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: BorderRadius.md,
    },
    filterTabActive: {
        backgroundColor: Colors.primary,
    },
    filterTabText: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.muted,
    },
    filterTabTextActive: {
        color: Colors.white,
    },
    listContent: {
        padding: Spacing.base,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: Spacing.md,
    },
    cardImageContainer: {
        height: 120,
        backgroundColor: Colors.accent,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardImagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImagePlaceholderIcon: {
        fontSize: 40,
        opacity: 0.5,
    },
    typeBadge: {
        position: 'absolute',
        top: Spacing.sm,
        left: Spacing.sm,
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
    },
    typeBadgeText: {
        color: Colors.white,
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.medium,
    },
    cardContent: {
        padding: Spacing.md,
    },
    cardHeader: {
        marginBottom: Spacing.sm,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
    },
    statusIcon: {
        fontSize: 12,
        marginRight: Spacing.xs,
    },
    statusText: {
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.medium,
    },
    cardDetails: {
        gap: Spacing.xs,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        fontSize: 12,
        marginRight: Spacing.sm,
        width: 18,
    },
    detailText: {
        color: Colors.muted,
        fontSize: Typography.fontSize.sm,
        flex: 1,
    },
    acceptButton: {
        backgroundColor: Colors.success,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        marginTop: Spacing.md,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: Colors.white,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: Spacing['5xl'],
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: Spacing.base,
    },
    emptyText: {
        fontSize: Typography.fontSize.md,
        color: Colors.foreground,
        marginBottom: Spacing.xs,
    },
    emptySubtext: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
    },
});
