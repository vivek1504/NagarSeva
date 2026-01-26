import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// User type
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'SURVEYOR' | 'ENGINEER';
}

// Auth token with localStorage persistence
export const tokenAtom = atomWithStorage<string | null>('authToken', null);

// User atom
export const userAtom = atomWithStorage<AuthUser | null>('nagarsevaUser', null);

// Derived authenticated state
export const isAuthenticatedAtom = atom((get) => {
    const token = get(tokenAtom);
    const user = get(userAtom);
    return !!token && !!user;
});

// Loading state for auth operations
export const authLoadingAtom = atom(false);

// Auth error state - using PrimitiveAtom for proper type inference
export const authErrorAtom = atom<string | null, [string | null], void>(
    null,
    (_get, set, newValue) => set(authErrorAtom, newValue)
);
