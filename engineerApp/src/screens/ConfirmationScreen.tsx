import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Colors, Typography, BorderRadius, Spacing } from '../theme';

export function ConfirmationScreen() {
    const navigation = useNavigation();

    const handleBackToIssues = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Issues' }],
            })
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* Success Icon */}
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>✅</Text>
                    </View>

                    {/* Success Message */}
                    <Text style={styles.title}>Issue Fixed!</Text>
                    <Text style={styles.subtitle}>Great work!</Text>
                    <Text style={styles.message}>
                        You have successfully marked this issue as fixed.
                    </Text>

                    {/* Status Card */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusIconWrapper}>
                            <Text style={styles.statusIcon}>⏳</Text>
                        </View>
                        <Text style={styles.statusTitle}>Awaiting Admin Verification</Text>
                        <Text style={styles.statusMessage}>
                            The admin will review and verify your fix. You'll be notified once verified.
                        </Text>

                        <View style={styles.statusDivider} />

                        <View style={styles.nextSteps}>
                            <Text style={styles.nextStepsTitle}>What happens next?</Text>
                            <View style={styles.nextStepItem}>
                                <View style={styles.nextStepNumber}>
                                    <Text style={styles.nextStepNumberText}>1</Text>
                                </View>
                                <Text style={styles.nextStepText}>Admin reviews your work</Text>
                            </View>
                            <View style={styles.nextStepItem}>
                                <View style={styles.nextStepNumber}>
                                    <Text style={styles.nextStepNumberText}>2</Text>
                                </View>
                                <Text style={styles.nextStepText}>Issue marked as resolved</Text>
                            </View>
                            <View style={styles.nextStepItem}>
                                <View style={styles.nextStepNumber}>
                                    <Text style={styles.nextStepNumberText}>3</Text>
                                </View>
                                <Text style={styles.nextStepText}>You get credit for the fix!</Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleBackToIssues}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>Back to Issues</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
        alignItems: 'center',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.successLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 2,
        borderColor: Colors.success + '40',
    },
    icon: {
        fontSize: 48,
    },
    title: {
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.foreground,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: Typography.fontSize.lg,
        color: Colors.success,
        textAlign: 'center',
        marginBottom: Spacing.sm,
        fontWeight: Typography.fontWeight.medium,
    },
    message: {
        fontSize: Typography.fontSize.md,
        color: Colors.muted,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    statusCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        width: '100%',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statusIconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.warningLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    statusIcon: {
        fontSize: 24,
    },
    statusTitle: {
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.warning,
        marginBottom: Spacing.xs,
        textAlign: 'center',
    },
    statusMessage: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
        textAlign: 'center',
        lineHeight: 20,
    },
    statusDivider: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.base,
    },
    nextSteps: {
        width: '100%',
    },
    nextStepsTitle: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.foreground,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    nextStepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    nextStepNumber: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.inProgressLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    nextStepNumberText: {
        color: Colors.primary,
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.semibold,
    },
    nextStepText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.muted,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing['3xl'],
        borderRadius: BorderRadius.lg,
    },
    buttonText: {
        color: Colors.white,
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    },
});
