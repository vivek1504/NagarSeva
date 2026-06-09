import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../theme';

// UX4G Button Variants
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'warning' | 'info' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'default',
    disabled = false,
    loading = false,
    style,
    textStyle,
    icon,
}: ButtonProps) {
    const buttonStyles = [
        styles.button,
        styles[`size_${size}`],
        styles[variant],
        disabled && styles.disabled,
        style,
    ];

    const isLightText = ['primary', 'secondary', 'danger', 'success', 'warning', 'info'].includes(variant);
    const textStyles = [
        styles.text,
        styles[`text_${size}`],
        isLightText ? styles.solidText : styles.darkText,
        variant === 'link' && styles.linkText,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={isLightText ? colors.textInverse : colors.primary}
                />
            ) : (
                <>
                    {icon}
                    <Text style={textStyles}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    // Size variants
    size_sm: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
    },
    size_default: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    size_lg: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xxl,
    },
    size_icon: {
        padding: spacing.md,
        aspectRatio: 1,
    },
    // UX4G Color variants
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    danger: {
        backgroundColor: colors.danger,
    },
    success: {
        backgroundColor: colors.success,
    },
    warning: {
        backgroundColor: colors.warning,
    },
    info: {
        backgroundColor: colors.info,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    link: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
    },
    disabled: {
        opacity: 0.5,
    },
    // Text styles
    text: {
        ...typography.bodyBold,
    },
    text_sm: {
        ...typography.small,
        fontWeight: '600',
    },
    text_default: {
        ...typography.bodyBold,
    },
    text_lg: {
        ...typography.bodyBold,
        fontSize: 18,
    },
    text_icon: {
        ...typography.body,
    },
    solidText: {
        color: colors.textInverse,
    },
    darkText: {
        color: colors.primary,
    },
    linkText: {
        textDecorationLine: 'underline',
    },
});
