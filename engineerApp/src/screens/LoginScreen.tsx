import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Colors, Typography, BorderRadius, Shadows, Spacing } from '../theme';

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        setIsLoading(true);
        try {
            await login({ email: email.trim(), password });
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            Alert.alert('Login Failed', message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logo}>🛠️</Text>
                        </View>
                        <Text style={styles.title}>VMC Engineer</Text>
                        <Text style={styles.subtitle}>Civic Issue Monitoring System</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, emailFocused && styles.labelFocused]}>
                                Email
                            </Text>
                            <View style={[
                                styles.inputWrapper,
                                emailFocused && styles.inputWrapperFocused
                            ]}>
                                <Text style={styles.inputIcon}>📧</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor={Colors.muted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!isLoading}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, passwordFocused && styles.labelFocused]}>
                                Password
                            </Text>
                            <View style={[
                                styles.inputWrapper,
                                passwordFocused && styles.inputWrapperFocused
                            ]}>
                                <Text style={styles.inputIcon}>🔒</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor={Colors.muted}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    editable={!isLoading}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={Colors.white} size="small" />
                            ) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerDivider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.footerBadge}>Engineer Portal</Text>
                            <View style={styles.dividerLine} />
                        </View>
                        <Text style={styles.version}>v1.0.0</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing['2xl'],
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing['5xl'],
    },
    logoContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent,
        borderRadius: 40,
        marginBottom: Spacing.lg,
    },
    logo: {
        fontSize: 40,
    },
    title: {
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.foreground,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: Colors.muted,
    },
    form: {
        marginBottom: Spacing['3xl'],
    },
    inputContainer: {
        marginBottom: Spacing.lg,
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.foreground,
        marginBottom: Spacing.sm,
    },
    labelFocused: {
        color: Colors.primary,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.base,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    inputWrapperFocused: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    inputIcon: {
        fontSize: 18,
        marginRight: Spacing.md,
    },
    input: {
        flex: 1,
        paddingVertical: Spacing.md,
        fontSize: Typography.fontSize.md,
        color: Colors.foreground,
    },
    button: {
        marginTop: Spacing.md,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.base,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: Colors.white,
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    },
    footer: {
        alignItems: 'center',
    },
    footerDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    dividerLine: {
        width: 40,
        height: 1,
        backgroundColor: Colors.border,
    },
    footerBadge: {
        color: Colors.muted,
        fontSize: Typography.fontSize.xs,
        marginHorizontal: Spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    version: {
        color: Colors.muted,
        fontSize: Typography.fontSize.xs,
    },
});
