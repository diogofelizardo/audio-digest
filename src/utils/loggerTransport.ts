import LoggerFactory from '@domain/logger/factory/logger.factory';
import LoggerPrismaRepository from '@infra/database/prisma/repository/logger-prisma.repository';
import transport from 'winston-transport';

interface LoggerTransportInterface {
  message: string;
  level: string;
  timestamp: Date;
}

export default class LoggerTransport extends transport {
  log({ message, level, timestamp }: LoggerTransportInterface, callback: () => void) {
    const loggerRepository = new LoggerPrismaRepository();
    const logger = LoggerFactory.create(message, level, timestamp);
    loggerRepository.create(logger);

    callback();
  }
}
