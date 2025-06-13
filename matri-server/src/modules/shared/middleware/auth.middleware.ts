import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/infrastructure/database/client';
import { parseSessionToken } from '@/infrastructure/authService/session';
import { logger } from '@/modules/shared/utils/logger';
import { addDays } from 'date-fns';

/**
 * Middleware to protect routes by validating session tokens.
 *
 * #### Flow:
 * 1. Extracts the session token from the `x-session-token` header.
 * 2. Parses the token to retrieve session metadata.
 * 3. Verifies the session exists and is not expired.
 * 4. Optionally refreshes the session if it's close to expiry.
 * 5. Ensures the associated user account is active.
 * 6. Attaches the authenticated user object to `req` for downstream usage.
 *
 * #### Failure Responses:
 * - `401 Unauthorized` if the token is missing, invalid, or expired.
 * - `403 Forbidden` if the user's account is inactive.
 */
export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Step 1: Extract session token from request header
        const sessionToken = req.headers['x-session-token'] as string;

        if (!sessionToken) {
            return res.status(401).json({ error: 'Session token missing' });
        }

        // Step 2: Parse and validate session token
        const sessionData = parseSessionToken(sessionToken);

        if (!sessionData || !sessionData.sessionId) {
            return res.status(401).json({ error: 'Invalid session token' });
        }

        // Step 3: Fetch the session and associated user from the database
        const session = await prisma.session.findUnique({
            where: { id: sessionData.sessionId },
            include: { user: true },
        });

        // Step 4: If session does not exist or is expired
        if (!session || new Date(session.expiresAt) < new Date()) {
            return res.status(401).json({ error: 'Session expired or not found' });
        }

        // Step 4.5: Refresh session expiration if it’s less than 2 days away
        const expiresIn = session.expiresAt.getTime() - Date.now();
        const daysLeft = expiresIn / (1000 * 60 * 60 * 24);

        if (daysLeft < 2) {
            await prisma.session.update({
                where: { id: session.id },
                data: { expiresAt: addDays(new Date(), 7) },
            });
            logger.info(`[SESSION] Refreshed expiry for user ${session.user.id}`);
        }

        // Step 5: Ensure the user account is active
        if (!session.user.isActive) {
            return res.status(403).json({ error: 'User account is inactive' });
        }

        // Step 6: Attach authenticated user to request object
        (req as any).user = session.user;

        next();
    } catch (err) {
        // Step 7: Handle unexpected errors
        logger.error('Auth middleware error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


//Usage

// import { sessionAuth } from '@/middleware/auth.middleware';

// router.get('/me', requireAuth, (req, res) => {
//     const user = (req as any).user;
//     res.json({ user });
// });