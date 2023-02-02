import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const logDir = `${__dirname}/../../logs`;

const baseOptions = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
];

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
  format: winston.format.combine(
    ...baseOptions,
    winston.format.printf(
      ({ timestamp, level, message, ...rest }) =>
        `${timestamp} ${level}: ${message} ${
          Object.keys(rest).length > 0 ? JSON.stringify(rest, undefined, 2) : ''
        }`
    )
  ),
  transports: [
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/debug`, // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 7, // 7 Days saved
      json: false,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`, // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 7, // 7 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        ...baseOptions,
        winston.format.prettyPrint({ colorize: true })
      ),
    }),
  ],
});

export const MorganLogger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        ...baseOptions,
        winston.format.colorize({ all: true }),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});
