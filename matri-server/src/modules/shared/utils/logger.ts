/**
 * A simple custom logger utility to standardize console output.
 * 
 * Provides consistent prefixes for different log levels (INFO, WARN, ERROR)
 * to help with debugging and monitoring in development and production.
 */
export const logger = {
    /**
     * Logs informational messages to the console.
     * @param args - Any values to be logged
     */
    info: (...args: unknown[]) => console.log('[INFO]', ...args),

    /**
     * Logs warning messages to the console.
     * @param args - Any values to be logged
     */
    warn: (...args: unknown[]) => console.warn('[WARN]', ...args),

    /**
     * Logs error messages to the console.
     * @param args - Any values to be logged
     */
    error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};
