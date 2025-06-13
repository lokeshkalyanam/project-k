import { OtpType } from '@prisma/client';

/**
 * @typedef RegisterInput
 * @description Input structure for user registration
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} [phone] - Optional phone number
 * @property {string} [email] - Optional email address
 * @property {string} password - Plain text password
 * @property {'MALE' | 'FEMALE' | 'OTHER'} gender - Gender of the user
 * @property {string} dateOfBirth - ISO-formatted birth date
 * @property {'SELF' | 'SON' | 'DAUGHTER' | 'SIBLING' | 'FRIEND' | 'OTHER'} [createdFor] - Relation for whom the profile is created
 */
export interface RegisterInput {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    password: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    dateOfBirth: string;
    createdFor?: 'SELF' | 'SON' | 'DAUGHTER' | 'SIBLING' | 'FRIEND' | 'OTHER';
}

/**
 * @typedef LoginInput
 * @description Input structure for user login
 * @property {string} emailOrPhone - Email or phone used to login
 * @property {string} password - Password
 * @property {string} deviceInfo - Device metadata or ID
 * @property {string} ipAddress - IP address of the client
 * @property {string} userAgent - User agent of the client browser/app
 */
export interface LoginInput {
    emailOrPhone: string;
    password: string;
    deviceInfo: string;
    ipAddress: string;
    userAgent: string;
}

/**
 * @typedef VerifyOtpInput
 * @description Input structure for verifying OTP
 * @property {string} phoneOrEmail - Phone or email to verify
 * @property {string} code - OTP code
 * @property {OtpType} type - OTP type (EMAIL or PHONE)
 */
export interface VerifyOtpInput {
    phoneOrEmail: string;
    code: string;
    type: OtpType;
}

/**
 * @typedef SessionPayload
 * @description Structure of an authenticated session
 * @property {string} sessionId - Unique session ID
 * @property {string} userId - User ID linked to session
 * @property {string} ipAddress - IP address during login
 * @property {string} deviceInfo - Device metadata
 * @property {string} userAgent - Browser/app information
 * @property {Date} expiresAt - Session expiration timestamp
 */
export interface SessionPayload {
    sessionId: string;
    userId: string;
    ipAddress: string;
    deviceInfo: string;
    userAgent: string;
    expiresAt: Date;
}

/**
 * @typedef AuthResponse
 * @description Sanitized user object returned post login/register
 * @property {string} userId - Internal user ID
 * @property {string} profileId - Public-facing profile ID
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {boolean} isProfileVerified - Whether the profile is verified
 * @property {boolean} isEmailVerified - Whether the email is verified
 * @property {boolean} isPhoneVerified - Whether the phone number is verified
 * @property {string | null} email - User's email address (nullable)
 * @property {string | null} phone - User's phone number (nullable)
 */
export interface AuthResponse {
    userId: string;
    profileId: string;
    firstName: string;
    lastName: string;
    isProfileVerified: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    email: string | null;
    phone: string | null;
}

/**
 * @typedef ResendOtpInput
 * @description Input structure to resend OTP
 * @property {string} phoneOrEmail - Target phone or email
 * @property {'EMAIL' | 'PHONE'} type - OTP type to resend
 */
export interface ResendOtpInput {
    phoneOrEmail: string;
    type: 'EMAIL' | 'PHONE';
}
