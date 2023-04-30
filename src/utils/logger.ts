import { addColors, createLogger, format, transports } from 'winston';
import LoggerTest from './loggerTransport';

const { combine, timestamp, printf, colorize, prettyPrint, json } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`;
});

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'bold red',
    warn: 'bold yellow',
    info: 'bold green',
    http: 'bold blue',
    verbose: 'bold cyan',
    debug: 'bold blue',
    silly: 'bold white',
  },
};

addColors(myCustomLevels.colors);

export default createLogger({
  levels: myCustomLevels.levels,
  transports: [
    new transports.Console({
      level: 'silly',
      format: combine(
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        json(),
        colorize(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        prettyPrint(),
        myFormat,
      ),
    }),
    new LoggerTest({
      level: 'silly',
      format: combine(
        format((debug) => {
          debug.level = debug.level.toUpperCase();
          return debug;
        })(),
        json(),
        timestamp(),
      ),
    }),
  ],
});
