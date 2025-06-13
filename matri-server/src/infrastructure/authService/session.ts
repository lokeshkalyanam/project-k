import { prisma } from '@/infrastructure/database/client';
import { addDays } from 'date-fns';
import { logger } from '@/modules/shared/utils/logger';

export interface SessionInput {
    userId: string;
    ipAddress: string;
    deviceInfo: string;
    userAgent: string;
}

/**
 * Creates a new user session in the database.
 *
 * @param input - Details of the session including user ID, IP address, device info, and user agent.
 * @returns The created session object.
 */
export const createSession = async (input: SessionInput) => {
    const expiresAt = addDays(new Date(), 7);

    const session = await prisma.session.create({
        data: {
            ...input,
            expiresAt,
        },
    });

    logger.info(`[SESSION] Created for user ${input.userId}`);

    return session;
};

/**
 * Encodes a session ID into a session token.
 * 
 * You can later enhance this to include encryption or signing.
 *
 * @param session - The session object containing the session ID.
 * @returns Base64 encoded session token.
 */
export const getSessionToken = (session: { id: string }) => {
    return Buffer.from(`${session.id}`).toString('base64');
};

/**
 * Parses a session token to extract the session ID.
 * 
 * This is a non-JWT approach using simple Base64 decoding.
 *
 * @param token - The session token string.
 * @returns An object containing the session ID or null if parsing fails.
 */
export const parseSessionToken = (token: string): { sessionId: string } | null => {
    try {
        const buffer = Buffer.from(token, 'base64').toString('utf8');
        const [sessionId] = buffer.split(':');
        return { sessionId };
    } catch (e) {
        return null;
    }
};
