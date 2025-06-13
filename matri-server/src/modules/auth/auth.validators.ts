import { z } from 'zod';
import { Gender, CreatedFor, OtpType } from '@prisma/client';

/**
 * Schema for validating user registration input.
 * Ensures all required fields such as name, contact info, password, gender, date of birth, and createdFor are valid.
 */
export const RegisterSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email').optional(),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
    createdFor: z.nativeEnum(CreatedFor).optional(),
});

/**
 * Schema for validating login input.
 * Requires either email or phone with password and device metadata for session tracking.
 */
export const LoginSchema = z.object({
    emailOrPhone: z.string().min(5, 'Email or phone must be at least 5 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    deviceInfo: z.string().min(2),
    ipAddress: z.string().min(7),
    userAgent: z.string().min(5),
});

/**
 * Schema for validating OTP verification input.
 * Ensures proper structure and type for OTP verification requests.
 */
export const OtpVerifySchema = z.object({
    phoneOrEmail: z.string().min(5, 'Phone or email required'),
    code: z.string().length(6, 'OTP must be 6 digits'),
    type: z.nativeEnum(OtpType),
});

/**
 * Validates input data against a provided Zod schema.
 *
 * @template T - Type inferred from the schema.
 * @param {z.ZodSchema<T>} schema - The Zod validation schema.
 * @param {unknown} data - Raw input data to validate.
 * @returns {T} - Validated and parsed data.
 * @throws {Error} - Throws with status code 400 and error message if validation fails.
 */
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const message =
            result.error.errors.map((e) => e.message).join(', ') || 'Validation error';
        const error = new Error(message);
        (error as any).status = 400;
        throw error;
    }
    return result.data;
};
