import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    StatusBar,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Login Failed', result.message || 'Invalid credentials. Please try again.');
        }
    }

    return (
        <View style={styles.container}>
            {/* Blue Status Bar */}
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            <View style={[styles.statusBar, { height: insets.top }]} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >


                {/* Login Card */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.formContainer}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Surveyor Login</Text>
                        <View style={styles.cardDivider} />

                        <Text style={styles.instructionText}>
                            Enter your credentials to access the survey portal
                        </Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email ID <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your official email"
                                placeholderTextColor={colors.textMuted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={colors.textMuted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoComplete="password"
                            />
                        </View>

                        <Button
                            title="Login"
                            onPress={handleLogin}
                            loading={loading}
                            style={styles.loginButton}
                        />

                        <Text style={styles.helpText}>
                            For login assistance, contact IT Helpdesk
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

            {/* Sticky Footer */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
                <Text style={styles.footerText}>Powered by</Text>
                <Text style={styles.digitalIndiaText}>Digital India 🇮🇳</Text>
                <Text style={styles.copyrightText}>
                    © 2024 Vadodara Municipal Corporation. All rights reserved.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    statusBar: {
        backgroundColor: colors.primary,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    emblemContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    emblemIcon: {
        fontSize: 40,
    },
    governmentText: {
        ...typography.small,
        color: colors.textMuted,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    title: {
        ...typography.heading2,
        color: colors.primary,
        marginTop: spacing.xs,
        textAlign: 'center',
    },
    divider: {
        width: 60,
        height: 2,
        backgroundColor: colors.primary,
        marginVertical: spacing.md,
    },
    appName: {
        ...typography.body,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    formContainer: {
        paddingHorizontal: spacing.lg,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.md,
    },
    cardTitle: {
        ...typography.heading3,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    cardDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
    },
    instructionText: {
        ...typography.caption,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    label: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    required: {
        color: colors.danger,
    },
    input: {
        backgroundColor: colors.surfaceAlt,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        ...typography.body,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    loginButton: {
        marginTop: spacing.md,
    },
    helpText: {
        ...typography.small,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.lg,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    footerText: {
        ...typography.small,
        color: colors.textMuted,
    },
    digitalIndiaText: {
        ...typography.bodyBold,
        color: colors.primary,
        marginTop: spacing.xs,
    },
    copyrightText: {
        ...typography.small,
        color: colors.textMuted,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
});
