import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';

interface HeaderProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}

export default function Header({
    title,
    subtitle,
    onBack,
    rightAction,
}: HeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
            <View style={styles.row}>
                {onBack && (
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
                {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: spacing.md,
        padding: spacing.xs,
    },
    backIcon: {
        color: colors.textInverse,
        fontSize: 24,
        fontWeight: '600',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        ...typography.heading2,
        color: colors.textInverse,
    },
    subtitle: {
        ...typography.caption,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 2,
    },
    rightAction: {
        marginLeft: spacing.md,
    },
});
