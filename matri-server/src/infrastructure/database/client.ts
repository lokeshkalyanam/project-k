import { PrismaClient } from '@prisma/client';

/**
 * Prisma client instance for interacting with the PostgreSQL database.
 * 
 * This instance is reused across the application to prevent
 * creating multiple database connections.
 */
export const prisma = new PrismaClient();
