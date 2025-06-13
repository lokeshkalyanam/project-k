/**
 * Express application configuration and middleware setup.
 * 
 * Includes security, request parsing, logging, routing, and global error handling.
 */

import express from 'express';                          // Express framework
import morgan from 'morgan';                            // HTTP request logger
import cors from 'cors';                                // Enable CORS (Cross-Origin Resource Sharing)
import helmet from 'helmet';                            // Security middleware for setting HTTP headers

import routes from './api/index.routes';                // Centralized API route handlers
import { errorHandler } from './modules/shared/middleware/error.middleware'; // Global error handler

// Initialize the Express app instance
const app = express();

/**
 * Apply security headers via Helmet.
 * - Helps prevent XSS, clickjacking, and other attacks.
 */
app.use(helmet());

/**
 * Enable CORS for all incoming requests.
 * - Adjust origin settings in production to restrict domains.
 */
app.use(cors());

/**
 * Parse incoming JSON requests.
 * - Populates `req.body` with the parsed data.
 */
app.use(express.json());

/**
 * Parse URL-encoded form data.
 * - Useful for form submissions using `application/x-www-form-urlencoded`.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Log all HTTP requests to the console in dev-friendly format.
 * - Includes method, URL, status, and response time.
 */
app.use(morgan('dev'));

/**
 * Mount all application API routes under the `/api` namespace.
 */
app.use('/api', routes);

/**
 * Global error handling middleware.
 * - Catches and formats all unhandled errors.
 */
app.use(errorHandler);

// Export the configured Express app for use in the server entry point
export default app;
