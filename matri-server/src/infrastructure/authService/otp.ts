import { prisma } from '@/infrastructure/database/client';
import { OtpType } from '@prisma/client';
import { addMinutes, isBefore } from 'date-fns';
import { logger } from '@/modules/shared/utils/logger';

const OTP_EXPIRY_MINUTES = 10;
const OTP_ATTEMPT_LIMIT = 5;

/**
 * Generates a random 6-digit numeric OTP code.
 *
 * @returns {string} A 6-digit OTP as a string.
 */
const generateCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Creates and stores a new OTP in the database for a user, and invalidates previous unused OTPs of the same type.
 *
 * @param {string} userId - The ID of the user to associate the OTP with.
 * @param {OtpType} type - The type of OTP (EMAIL or PHONE).
 * @param {string} target - The email or phone number the OTP is being sent to (for logging).
 * @returns {Promise<string>} The generated OTP code.
 */
export const generateOtp = async (
    userId: string,
    type: OtpType,
    target: string
): Promise<string> => {
    const code = generateCode();

    await prisma.otp.updateMany({
        where: {
            userId,
            type,
            verifiedAt: null,
        },
        data: {
            attempts: OTP_ATTEMPT_LIMIT,
        },
    });

    await prisma.otp.create({
        data: {
            userId,
            type,
            code,
            expiresAt: addMinutes(new Date(), OTP_EXPIRY_MINUTES),
        },
    });

    logger.info(`[OTP] Sent ${type} OTP to ${target}: ${code}`);
    return code;
};

/**
 * Verifies a user-provided OTP against the most recent unverified one in the database.
 *
 * @param {string} userId - The ID of the user submitting the OTP.
 * @param {string} code - The OTP code submitted for verification.
 * @param {OtpType} type - The type of OTP being verified (EMAIL or PHONE).
 * @returns {Promise<boolean>} True if the OTP is valid and verified, false otherwise.
 * @throws {Error} If no OTP is found, OTP has expired, or the attempt limit has been exceeded.
 */
export const verifyStoredOtp = async (
    userId: string,
    code: string,
    type: OtpType
): Promise<boolean> => {
    const otp = await prisma.otp.findFirst({
        where: {
            userId,
            type,
            verifiedAt: null,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!otp) {
        throw new Error('No OTP found');
    }

    if (otp.attempts >= OTP_ATTEMPT_LIMIT) {
        throw new Error('OTP attempt limit exceeded');
    }

    if (isBefore(otp.expiresAt, new Date())) {
        throw new Error('OTP expired');
    }

    const isValid = otp.code === code;

    await prisma.otp.update({
        where: {
            id: otp.id,
        },
        data: {
            attempts: otp.attempts + 1,
            verifiedAt: isValid ? new Date() : undefined,
        },
    });

    return isValid;
};
