import { Router } from 'express';
import {
    handleResendOtp,
    handleLogout,
    handleLogin,
    handleRegister,
    handleverifyOtp,
    handleRequestPasswordReset,
    handleResetPassword,
} from './auth.controller';

const router = Router();

/**
 * @route   POST /auth/register
 * @desc    Registers a new user and sends OTP to phone/email for verification
 * @access  Public
 */
router.post('/register', handleRegister);

/**
 * @route   POST /auth/login
 * @desc    Authenticates user via phone/email & password. Returns session token.
 * @access  Public
 */
router.post('/login', handleLogin);

/**
 * @route   POST /auth/verify-otp
 * @desc    Verifies the received OTP and marks phone/email as verified
 * @access  Public
 */
router.post('/verify-otp', handleverifyOtp);

/**
 * @route   POST /auth/resend-otp
 * @desc    Resends OTP to user's registered phone/email
 * @access  Public
 */
router.post('/resend-otp', handleResendOtp);

/**
 * @route   POST /auth/logout
 * @desc    Logs out the user by invalidating session using session ID in headers
 * @access  Private (requires session token or session ID)
 */
router.post('/logout', handleLogout);

/**
 * @route   POST /auth/forgot-password
 * @desc    Sends OTP to user’s registered email/phone for password reset
 * @access  Public
 */
router.post('/forgot-password', handleRequestPasswordReset);

/**
 * @route   POST /auth/reset-password
 * @desc    Resets user password after OTP verification
 * @access  Public
 */
router.post('/reset-password', handleResetPassword);

export default router;
