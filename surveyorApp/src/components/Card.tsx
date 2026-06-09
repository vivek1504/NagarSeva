import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '../theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padded?: boolean;
    elevated?: boolean;
}

export default function Card({
    children,
    style,
    padded = true,
    elevated = true,
}: CardProps) {
    return (
        <View
            style={[
                styles.card,
                padded && styles.padded,
                elevated && shadows.md,
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    padded: {
        padding: spacing.lg,
    },
});
