import { NextFunction, Request, Response } from 'express';
import {
    login,
    logout,
    register,
    requestPasswordReset,
    resendOtp,
    resetPassword,
} from './auth.service';
import { verifyStoredOtp, generateOtp } from '@/infrastructure/authService/otp';
import { createSession, getSessionToken } from '@/infrastructure/authService/session';
import { logger } from '@/modules/shared/utils/logger';
import { prisma } from '@/infrastructure/database/client';
import { OtpType } from '@prisma/client';

/**
 * @desc    Registers a user and sends an OTP to phone/email
 * @route   POST /auth/register
 * @access  Public
 */
export const handleRegister = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, phone, email, profileId } = await register(req.body);

        // Send OTP to phone or email after registration
        if (phone) {
            await generateOtp(userId, OtpType.PHONE, phone);
        } else if (email) {
            await generateOtp(userId, OtpType.EMAIL, email);
        }

        return res.status(201).json({ message: 'User registered, OTP sent', profileId });
    } catch (err) {
        logger.error('Register Error:', err);
        return res.status(400).json({ error: err instanceof Error ? err.message : 'Register failed' });
    }
};

/**
 * @desc    Logs in the user and creates a session
 * @route   POST /auth/login
 * @access  Public
 */
export const handleLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            user: { userId, isEmailVerified, isPhoneVerified },
        } = await login(req.body);

        if (!isEmailVerified || !isPhoneVerified) {
            return res.status(403).json({ error: 'Verify your email or phone before login' });
        }

        // Create session for this login
        const session = await createSession({
            userId: userId,
            ipAddress: req.ip || 'unknown',
            deviceInfo: Array.isArray(req.headers['sec-ch-ua-platform'])
                ? req.headers['sec-ch-ua-platform'][0]
                : req.headers['sec-ch-ua-platform'] || 'unknown',
            userAgent: Array.isArray(req.headers['user-agent'])
                ? req.headers['user-agent'][0]
                : req.headers['user-agent'] || 'unknown',
        });

        const sessionToken = getSessionToken(session);

        return res.status(200).json({ message: 'Login successful', sessionToken });
    } catch (err) {
        logger.error('Login Error:', err);
        return res.status(401).json({ error: err instanceof Error ? err.message : 'Login failed' });
    }
};

/**
 * @desc    Verifies OTP and updates user verification status
 * @route   POST /auth/verify-otp
 * @access  Public
 */
export const handleverifyOtp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, code, type } = req.body;

        const success = await verifyStoredOtp(userId, code, type);
        if (!success) return res.status(400).json({ error: 'Invalid OTP' });

        const updateField = type === 'PHONE' ? { isPhoneVerified: true } : { isEmailVerified: true };

        await prisma.user.update({
            where: { id: userId },
            data: updateField,
        });

        return res.status(200).json({ message: `${type} verified successfully` });
    } catch (err) {
        logger.error('OTP Verify Error:', err);
        return res.status(400).json({ error: err instanceof Error ? err.message : 'OTP verification failed' });
    }
};

/**
 * @desc    Resends OTP to phone/email
 * @route   POST /auth/resend-otp
 * @access  Public
 */
export const handleResendOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { phoneOrEmail, type } = req.body;

        if (!phoneOrEmail || !type) {
            return res.status(400).json({ message: 'Missing phoneOrEmail or type' });
        }

        const result = await resendOtp({ phoneOrEmail, type });

        res.status(200).json({ message: result });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Logs out the user by invalidating session
 * @route   POST /auth/logout
 * @access  Private
 */
export const handleLogout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const sessionId = req.headers['x-session-id'] as string;

        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID missing from headers' });
        }

        const result = await logout(sessionId);
        res.status(200).json({ message: result });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Sends OTP for password reset
 * @route   POST /auth/forgot-password
 * @access  Public
 */
export const handleRequestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phoneOrEmail, type } = req.body;
        const message = await requestPasswordReset(phoneOrEmail, type);
        res.status(200).json({ message });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Resets password after OTP verification
 * @route   POST /auth/reset-password
 * @access  Public
 */
export const handleResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phoneOrEmail, type, code, newPassword } = req.body;
        const message = await resetPassword(phoneOrEmail, type, code, newPassword);
        res.status(200).json({ message });
    } catch (err) {
        next(err);
    }
};
