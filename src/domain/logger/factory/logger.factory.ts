import { v4 as uuid } from 'uuid';
import Logger from '../entity/logger';

export default class LoggerFactory {
  public static create(message: string, status: string, date: Date): Logger {
    return new Logger(uuid(), message, status, date, date);
  }
}
