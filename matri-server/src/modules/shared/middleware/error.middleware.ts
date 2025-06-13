import { Request, Response, NextFunction } from 'express';

/**
 * Global error-handling middleware for Express.
 * 
 * - Catches all unhandled errors thrown in routes/middleware.
 * - Sends a standardized JSON response with status, error message, and (optionally) the stack trace.
 * - Logs the error details to the console for debugging.
 * - Stack trace is only shown in development to avoid exposing internal logic in production.
 */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    res.status(status).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
