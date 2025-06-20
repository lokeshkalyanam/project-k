// src/features/auth/useAuth.ts

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials as setCreds, logout as logoutAction } from './authSlice';
import { setCookie, deleteCookie } from 'cookies-next';

/**
 * Custom React hook to access and manage authentication state and actions.
 *
 * Provides the current auth state (`user`, `sessionToken`, `isAuthenticated`)
 * and helper functions to set credentials and log out.
 *
 * @returns {{
 *   user: any,
 *   sessionToken: string | null,
 *   isAuthenticated: boolean,
 *   setCredentials: (user: any, sessionToken: string) => void,
 *   logout: () => void
 * }} Authentication state and action handlers.
 */
export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    /**
     * Sets user credentials in Redux and saves session token in cookies.
     *
     * @param user - The authenticated user object.
     * @param sessionToken - The JWT or session token.
     */
    const setCredentials = (user: any, sessionToken: string) => {
        setCookie('sessionToken', sessionToken, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: 'strict',
            secure: true,
        });
        dispatch(setCreds({ user, sessionToken }));
    };

    /**
     * Logs out the user by removing the session token cookie and clearing Redux state.
     */
    const logout = () => {
        deleteCookie('sessionToken');
        dispatch(logoutAction());
    };

    return { ...auth, setCredentials, logout };
};
