import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthState, User, LoginCredentials } from '../types';
import { apiClient } from '../api/apiClient';
import { storage } from '../utils/storage';

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Check for existing token on mount
    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const token = await storage.getToken();
            const user = await storage.getUser() as User | null;

            if (token && user) {
                setState({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                setState(prev => ({ ...prev, isLoading: false }));
            }
        } catch (error) {
            console.error('Error checking auth state:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));

            const response = await apiClient.login(credentials);
            const { token, user } = response;

            // For now, create a basic user object if not returned by API
            const userData: User = user || {
                id: 'engineer-user',
                email: credentials.email,
                name: credentials.email.split('@')[0],
                role: 'ENGINEER',
            };

            await storage.storeToken(token);
            await storage.storeUser(userData);

            setState({
                user: userData,
                token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await storage.clearAll();
            setState({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
