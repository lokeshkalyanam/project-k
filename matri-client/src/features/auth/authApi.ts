// src/features/auth/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    LoginRequest,
    RegisterRequest,
    VerifyOtpRequest,
    AuthResponse,
    ResendOtpRequest,
} from '@/types/auth.types';

/**
 * RTK Query API slice for authentication-related operations.
 *
 * Handles user registration, login, OTP verification, logout, and fetching the current user.
 */
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include', // Automatically includes cookies in requests
    }),
    endpoints: (builder) => ({
        /**
         * Registers a new user.
         * 
         * @param body - The registration data (name, email, password, etc.)
         * @returns The authentication response including user and tokens.
         */
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),

        /**
         * Logs in an existing user.
         * 
         * @param body - The login credentials (email and password)
         * @returns The authentication response including user and tokens.
         */
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),

        /**
         * Verifies the OTP sent to the user (for email or phone verification).
         * 
         * @param body - OTP and user ID or context info.
         * @returns The authentication response including user and tokens.
         */
        verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
            query: (body) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body,
            }),
        }),

        /**
         * Resends the OTP to the user's email or phone.
         * 
         * @param body - The info required to resend OTP (e.g., email, type).
         */
        resendOtp: builder.mutation<void, ResendOtpRequest>({
            query: (body) => ({
                url: '/auth/resend-otp',
                method: 'POST',
                body,
            }),
        }),

        /**
         * Logs out the current user.
         */
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        /**
         * Fetches the current authenticated user's data.
         * 
         * @returns The user object if authenticated.
         */
        getCurrentUser: builder.query<AuthResponse['user'], void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useLogoutMutation,
} = authApi;
