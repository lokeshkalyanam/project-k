// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import { authApi } from '@/features/auth/authApi';

/**
 * Redux store configuration using Redux Toolkit.
 *
 * - Includes `auth` slice for managing authentication state.
 * - Integrates `authApi` slice from RTK Query for async auth requests.
 */
export const store = configureStore({
    reducer: {
        // Authentication slice reducer
        auth: authReducer,

        // RTK Query reducer for auth endpoints
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

/**
 * RootState type representing the full Redux state tree.
 * Useful for typing useSelector.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type for dispatching typed Redux actions.
 * Useful for typing useDispatch.
 */
export type AppDispatch = typeof store.dispatch;
