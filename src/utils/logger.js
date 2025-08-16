import winston from 'winston';

const level = process.env.LOG_LEVEL || 'info';
const enableConsole = String(process.env.ENABLE_CONSOLE_LOGGING || 'true') === 'true';
const enableFile = String(process.env.ENABLE_FILE_LOGGING || 'true') === 'true';

const transports = [];
if (enableConsole) transports.push(new winston.transports.Console());
if (enableFile) transports.push(new winston.transports.File({ filename: `${process.env.LOG_DIR || './logs'}/app.log` }));

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});

export default logger;