import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import api from '../services/api';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userData = await AsyncStorage.getItem('userData');
            if (token && userData) {
                setUser(JSON.parse(userData));
                api.setToken(token);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await api.login(email, password);
            console.log('Login response:', JSON.stringify(response, null, 2));

            if (response.token) {
                // Decode basic user info from token or create placeholder
                // For now, we'll store email and a generated user object
                // The backend doesn't return user details, so we derive from email
                const userData: User = {
                    id: email, // Use email as ID since backend doesn't provide user ID
                    name: email.split('@')[0], // Derive name from email
                    email: email,
                    role: 'SURVEYOR',
                };

                await AsyncStorage.setItem('authToken', response.token);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                api.setToken(response.token);
                setUser(userData);
                return { success: true };
            }

            return {
                success: false,
                message: response.message || 'Login failed'
            };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        }
    }

    async function logout(): Promise<void> {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userData');
        api.setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
