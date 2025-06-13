import { CreatedFor, OtpType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { RegisterInput, LoginInput, VerifyOtpInput,ResendOtpInput } from './auth.types';
import { generateOtp, verifyStoredOtp } from '@/infrastructure/authService/otp';
import { createSession, getSessionToken } from '@/infrastructure/authService/session';
import { prisma } from '@/infrastructure/database/client';
import { nanoid } from 'nanoid';

/**
 * Registers a new user in the system.
 * - Hashes the password
 * - Stores user data in the DB
 * - Generates OTP for email and/or phone verification
 * 
 * @param input - User registration input (name, email/phone, etc.)
 * @returns Newly created user details (including profile ID)
 * @throws Error if email or phone already exists
 */
export const register = async (input: RegisterInput) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dateOfBirth,
        createdFor = CreatedFor.SELF,
    } = input;

    const existing = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { phone }],
        },
    });

    if (existing) {
        throw new Error('Email or phone already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            gender,
            createdFor,
            dateOfBirth: new Date(dateOfBirth),
            passwordHash: hashedPassword,
            profileId: `IND-${nanoid(8)}`,
        },
    });

    if (email) await generateOtp(user.id, OtpType.EMAIL, email);
    if (phone) await generateOtp(user.id, OtpType.PHONE, phone);

    return {
        userId: user.id,
        profileId: user.profileId,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        isProfileVerified: user.isProfileVerified,
        email: user.email,
        phone: user.phone,
    };
};

/**
 * Authenticates a user by email/phone and password.
 * - Validates credentials
 * - Creates a new session with IP/device info
 * 
 * @param input - Login input (emailOrPhone, password, userAgent, etc.)
 * @returns AuthResponse with user info and session token
 * @throws Error on invalid credentials or inactive account
 */
export const login = async (input: LoginInput) => {
    const { emailOrPhone, password, deviceInfo, ipAddress, userAgent } = input;

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        },
    });

    if (!user || !user.passwordHash) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
        throw new Error('User account is inactive. Contact support.');
    }

    const session = await createSession({
        userId: user.id,
        ipAddress,
        deviceInfo,
        userAgent,
    });

    const sessionToken = getSessionToken(session); // internal use

    return {
        sessionToken,
        user: {
            userId: user.id,
            profileId: user.profileId,
            firstName: user.firstName,
            lastName: user.lastName,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            isProfileVerified: user.isProfileVerified,
        },
    };
};

/**
 * Verifies OTP sent to phone/email and marks them as verified.
 * - Updates user verification status
 * 
 * @param input - OTP input (email/phone, code, type)
 * @returns Success message
 * @throws Error if user not found or OTP is invalid
 */
export const verifyOtp = async (input: VerifyOtpInput): Promise<string> => {
    const { phoneOrEmail, code, type } = input;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                type === 'EMAIL' ? { email: phoneOrEmail } : {},
                type === 'PHONE' ? { phone: phoneOrEmail } : {},
            ],
        },
    });

    if (!user) throw new Error('User not found');

    const success = await verifyStoredOtp(user.id, code, type);
    if (!success) throw new Error('OTP verification failed');

    const field = type === OtpType.EMAIL ? 'isEmailVerified' : 'isPhoneVerified';

    await prisma.user.update({
        where: { id: user.id },
        data: { [field]: true, isActive: true },
    });

    return `${type} verification successful`;
};

/**
 * Resends OTP for email or phone verification.
 * - Looks up user by email/phone
 * - Regenerates and sends OTP
 * 
 * @param input - ResendOtpInput (email/phone + type)
 * @returns Status message
 * @throws Error if user not found or no valid contact
 */
export const resendOtp = async (input: ResendOtpInput): Promise<string> => {
    const { phoneOrEmail, type } = input;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                type === OtpType.EMAIL ? { email: phoneOrEmail } : {},
                type === OtpType.PHONE ? { phone: phoneOrEmail } : {},
            ],
        },
    });

    if (!user) throw new Error('User not found');

    // Generate and send new OTP
    if (type === OtpType.EMAIL && user.email) {
        await generateOtp(user.id, OtpType.EMAIL, user.email);
        return 'Email OTP resent successfully';
    }

    if (type === OtpType.PHONE && user.phone) {
        await generateOtp(user.id, OtpType.PHONE, user.phone);
        return 'Phone OTP resent successfully';
    }

    throw new Error(`No valid ${type.toLowerCase()} found to send OTP`);
};


/**
 * Logs out a user by destroying the active session from DB.
 * 
 * @param sessionId - Session ID to be terminated
 * @returns Success message
 * @throws Error if session not found
 */
export const logout = async (sessionId: string): Promise<string> => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
    });

    if (!session) {
        throw new Error('Invalid session or already logged out');
    }

    await prisma.session.delete({
        where: { id: sessionId },
    });

    return 'Logout successful';
};

/**
 * Initiates password reset process.
 * - Sends OTP to the user's email or phone
 * 
 * @param phoneOrEmail - User's email or phone
 * @param type - OTP type (EMAIL or PHONE)
 * @returns Status message
 * @throws Error if user not found
 */
export const requestPasswordReset = async (
    phoneOrEmail: string,
    type: OtpType
): Promise<string> => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                type === 'EMAIL' ? { email: phoneOrEmail } : {},
                type === 'PHONE' ? { phone: phoneOrEmail } : {},
            ],
        },
    });

    if (!user) throw new Error('User not found');

    await generateOtp(user.id, type, phoneOrEmail);

    return `OTP sent to your ${type.toLowerCase()}`;
};

/**
 * Resets user's password after verifying OTP.
 * - Hashes and updates new password
 * 
 * @param phoneOrEmail - User's email or phone
 * @param type - OTP type
 * @param code - OTP code
 * @param newPassword - New password to set
 * @returns Status message
 * @throws Error if OTP is invalid or user not found
 */
export const resetPassword = async (
    phoneOrEmail: string,
    type: OtpType,
    code: string,
    newPassword: string
): Promise<string> => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                type === 'EMAIL' ? { email: phoneOrEmail } : {},
                type === 'PHONE' ? { phone: phoneOrEmail } : {},
            ],
        },
    });

    if (!user) throw new Error('User not found');

    const isValid = await verifyStoredOtp(user.id, code, type);
    if (!isValid) throw new Error('OTP is invalid or expired');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: hashedPassword },
    });

    return 'Password has been reset successfully';
};
