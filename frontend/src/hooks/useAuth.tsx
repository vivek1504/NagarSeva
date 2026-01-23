import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { userAtom, tokenAtom, isAuthenticatedAtom, authLoadingAtom, authErrorAtom, type AuthUser } from '@/atoms/authAtom';
import { authApi } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useAtom(authLoadingAtom);
  const [error, setError] = useAtom(authErrorAtom);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(email, password);

      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('authToken', response.data.token);
        setIsLoading(false);
        return true;
      } else {
        setError(response.message || 'Login failed');
        setIsLoading(false);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  }, [setUser, setToken, setIsLoading, setError]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  }, [setUser, setToken]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
}
