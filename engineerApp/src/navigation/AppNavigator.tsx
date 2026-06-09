import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { Issue } from '../types';
import { Colors, Typography } from '../theme';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { IssuesScreen } from '../screens/IssuesScreen';
import { IssueDetailScreen } from '../screens/IssueDetailScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';

// Navigation types
export type RootStackParamList = {
    Login: undefined;
    Issues: undefined;
    IssueDetail: { issue: Issue };
    Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading screen while checking auth state
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: Colors.white,
                    headerTitleStyle: { fontWeight: Typography.fontWeight.semibold },
                    contentStyle: { backgroundColor: Colors.background },
                    animation: 'slide_from_right',
                }}
            >
                {!isAuthenticated ? (
                    // Auth stack
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                ) : (
                    // Main app stack
                    <>
                        <Stack.Screen
                            name="Issues"
                            component={IssuesScreen}
                            options={{
                                title: 'My Issues',
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="IssueDetail"
                            component={IssueDetailScreen}
                            options={{
                                title: 'Issue Details',
                                headerBackTitle: 'Back',
                            }}
                        />
                        <Stack.Screen
                            name="Confirmation"
                            component={ConfirmationScreen}
                            options={{
                                title: 'Success',
                                headerShown: false,
                                gestureEnabled: false,
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});
