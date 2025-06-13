/**
 * Entry point for the Node.js backend server.
 * 
 * - Loads environment variables
 * - Initializes and starts the HTTP server
 * - Uses Express as the application handler
 */

import { config } from 'dotenv';         // Load environment variables from `.env`
import http from 'http';                 // Node.js core HTTP module
import app from './app';                 // Express application instance
import { env } from './config/env';      // Validated environment config
import { logger } from './modules/shared/utils/logger'; // Custom logging utility

// Load .env variables into process.env before anything else executes
config();

/**
 * Define the server port.
 * Defaults to 5000 if not provided in environment variables.
 */
const PORT = env.PORT || 5000;

/**
 * Create an HTTP server using the Express app.
 */
const server = http.createServer(app);

/**
 * Start listening for incoming requests on the specified port.
 */
server.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});
