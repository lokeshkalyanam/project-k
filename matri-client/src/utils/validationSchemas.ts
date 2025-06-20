import * as z from 'zod';

/**
 * Schema for validating user registration form.
 *
 * Fields:
 * - firstName: Required string, at least 1 character.
 * - lastName: Required string, at least 1 character.
 * - email: Required valid email address.
 * - password: Minimum 6 characters.
 *
 * Error messages use scoped i18n keys from `userRegister`.
 */
export const registerSchema = z.object({
    firstName: z.string().min(1, 'userRegister.firstNameRequired'),
    lastName: z.string().min(1, 'userRegister.lastNameRequired'),
    email: z.string().email('userRegister.invalidEmail'),
    password: z.string().min(6, 'userRegister.passwordTooShort'),
});

/**
 * Schema for validating user login form.
 *
 * Fields:
 * - email: Must be a valid email address.
 * - password: Required string.
 *
 * Error messages use scoped i18n keys from `userLogin`.
 */
export const loginSchema = z.object({
    email: z.string().email('userLogin.invalidEmail'),
    password: z.string().min(1, 'userLogin.passwordRequired'),
});

/**
 * Schema for verifying OTP sent to the user.
 *
 * Fields:
 * - email: Must be a valid email.
 * - otp: Must be exactly 6 digits.
 *
 * Error messages use scoped i18n keys from `userOtp`.
 */
export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, 'userOtp.invalidOtp'),
});
