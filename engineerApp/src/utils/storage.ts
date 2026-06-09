import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storage = {
    async storeToken(token: string): Promise<void> {
        try {
            await EncryptedStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error storing token:', error);
            throw error;
        }
    },

    async getToken(): Promise<string | null> {
        try {
            return await EncryptedStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    async removeToken(): Promise<void> {
        try {
            await EncryptedStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error removing token:', error);
        }
    },

    async storeUser(user: object): Promise<void> {
        try {
            await EncryptedStorage.setItem(USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error storing user:', error);
            throw error;
        }
    },

    async getUser(): Promise<object | null> {
        try {
            const user = await EncryptedStorage.getItem(USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },

    async removeUser(): Promise<void> {
        try {
            await EncryptedStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Error removing user:', error);
        }
    },

    async clearAll(): Promise<void> {
        await this.removeToken();
        await this.removeUser();
    },
};
