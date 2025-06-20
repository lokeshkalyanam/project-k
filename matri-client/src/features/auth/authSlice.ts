// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse } from '@/types/auth.types';

/**
 * AuthState represents the authentication slice of the Redux store.
 *
 * @property user - The currently authenticated user's data.
 * @property isAuthenticated - Whether the user is logged in.
 * @property sessionToken - The user's current session or access token.
 */
type AuthState = {
    user: AuthResponse['user'] | null;
    isAuthenticated: boolean;
    sessionToken: string | null;
};

/**
 * Initial state for the auth slice.
 */
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    sessionToken: null,
};

/**
 * Redux slice for authentication state management.
 *
 * Handles setting and clearing user authentication data.
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Sets the current user's credentials after successful login or registration.
         *
         * @param state - The current state of the auth slice.
         * @param action - The payload containing user data and session token.
         */
        setCredentials: (
            state,
            action: PayloadAction<{ user: AuthResponse['user']; sessionToken: string }>
        ) => {
            state.user = action.payload.user;
            state.sessionToken = action.payload.sessionToken;
            state.isAuthenticated = true;
        },

        /**
         * Logs out the current user and clears authentication state.
         *
         * @param state - The current state of the auth slice.
         */
        logout: (state) => {
            state.user = null;
            state.sessionToken = null;
            state.isAuthenticated = false;
        },
    },
});

// Export actions for dispatching
export const { setCredentials, logout } = authSlice.actions;

// Export reducer to be added to the Redux store
export default authSlice.reducer;
