import { createLogger, format, transports } from 'winston';


/**
 * Winston logger configuration to log information, errors, and combined logs.
 * Logs are output to the console and written to log files for error and combined logs.
 */
const logger = createLogger({
  // Log level specifies the minimum level of messages to log (e.g., info, error).  
  level: 'info',

  // Format combines timestamp and JSON formats for structured logging.
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  // Transports define where and how the logs are stored/output.
  transports: [
     // Outputs logs to the console (useful for development).
    new transports.Console(),

    // Writes only error-level logs to 'error.log'.
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    
    // Writes all log levels (info and above) to 'combined.log'.
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
