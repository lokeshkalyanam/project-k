/**
 * ===============================
 * ENUM TYPES
 * ===============================
 */

/**
 * Enum representing gender identities.
 */
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

/**
 * Enum for whom the profile is created.
 */
export type CreatedFor = 'SELF' | 'SON' | 'DAUGHTER' | 'SIBLING' | 'FRIEND' | 'OTHER';

/**
 * Enum for OTP communication type.
 */
export type OtpType = 'EMAIL' | 'PHONE';

/**
 * Enum for expressing interest status between users.
 */
export type InterestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';




/**
 * ===============================
 * INPUT DTOs
 * ===============================
 */

/**
 * Input fields required for user registration form validation.
 */
export interface RegisterInput {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    password: string;
    gender: Gender;
    dateOfBirth: string;
    createdFor?: CreatedFor;
}

/**
 * Request payload for backend registration API.
 */
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

/**
 * Request payload for login API.
 */
export interface LoginRequest {
    emailOrPhone: string;
    password: string;
}

/**
 * Extended login input used on the backend to capture device metadata.
 */
export interface LoginInput {
    emailOrPhone: string;
    password: string;
    deviceInfo: string;
    ipAddress: string;
    userAgent: string;
}

/**
 * Request payload for OTP verification API.
 */
export interface VerifyOtpRequest {
    otp: string;
    otpType: OtpType;
}

/**
 * Request payload for resending OTP.
 */
export interface ResendOtpRequest {
    otpType: OtpType;
}

/**
 * Full input structure for OTP verification (used in frontend form).
 */
export interface VerifyOtpInput {
    phoneOrEmail: string;
    code: string;
    type: OtpType;
}

/**
 * Full input structure for resending OTP (used in frontend form).
 */
export interface ResendOtpInput {
    phoneOrEmail: string;
    type: OtpType;
}




/**
 * ===============================
 * RESPONSE TYPES
 * ===============================
 */

/**
 * Sanitized user data returned from the backend after authentication.
 */
export interface AuthUser {
    userId: string;
    profileId: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    createdAt: string;
}

/**
 * Common auth response from backend, includes user and session token.
 */
export interface AuthResponse {
    user: AuthUser;
    sessionToken: string;
}

/**
 * Represents a decoded authenticated session.
 */
export interface SessionPayload {
    sessionId: string;
    userId: string;
    ipAddress: string;
    deviceInfo: string;
    userAgent: string;
    expiresAt: Date;
}
