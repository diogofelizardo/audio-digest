import { addColors, createLogger, format, transports } from 'winston';
import LoggerTest from './loggerTransport';

const { combine, timestamp, printf, colorize, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`;
});

const myCustomLevels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  },
  colors: {
    emerg: 'bold red',
    alert: 'bold yellow',
    crit: 'bold red',
    error: 'bold red',
    warning: 'bold yellow',
    notice: 'bold green',
    info: 'bold green',
    debug: 'bold blue',
  },
};

addColors(myCustomLevels.colors);

export default createLogger({
  levels: myCustomLevels.levels,
  transports: [
    new transports.Console({
      format: combine(
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        colorize(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        prettyPrint(),
        myFormat,
      ),
    }),
    new LoggerTest({
      format: combine(
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        timestamp(),
      ),
    }),
  ],
});
