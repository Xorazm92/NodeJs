import { createLogger, format, transports } from 'winston';
import 'winston-mongodb'; 

export const logger = createLogger({
  level: 'silly', 
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.colorize({ all: true })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'application.log' }), 
    new transports.File({ filename: 'error.log', level: 'error' }), 
    new transports.MongoDB({
      level: 'error',
      db: 'mongodb://localhost:27017/logs',
      collection: 'error_logs',
      // options: { useUnifiedTopology: true }
    })
  ]
});

// Log yozuvlari
logger.error('This is an error message');
logger.warn('This is a warning message'); 
logger.info('This is an info message');
logger.verbose('This is a verbose message');
logger.debug('This is a debug message');
logger.silly('This is a silly message');

