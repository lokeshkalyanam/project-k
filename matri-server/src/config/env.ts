import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralized environment variable configuration.
 * 
 * Loads and validates all required environment variables used
 * across the application, with fallback defaults where appropriate.
 */
export const env = {
    /**
     * Application runtime environment.
     * Typically: 'development', 'production', or 'test'.
     */
    NODE_ENV: process.env.NODE_ENV || 'development',

    /**
     * Port on which the server runs.
     * Defaults to 5000 if not specified.
     */
    PORT: parseInt(process.env.PORT || '5000', 10),

    /**
     * PostgreSQL database connection URL for Prisma.
     * This must be defined in the `.env` file.
     */
    DATABASE_URL: process.env.DATABASE_URL || '',

    /**
     * Time (in minutes) before an OTP expires.
     * Defaults to 5 minutes.
     */
    OTP_EXPIRY_MINUTES: parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10),
};
