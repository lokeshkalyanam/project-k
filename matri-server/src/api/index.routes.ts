import { Router } from 'express';
import authRoutes from '@/modules/auth/auth.routes';

const router = Router();

/**
 * Sets up API routes for the application.
 *
 * @module Routes
 * @desc This root router mounts all feature-specific route modules.
 */

// Mounts all authentication-related routes under /auth
router.use('/auth', authRoutes);

export default router;
