import Logger from '@domain/logger/entity/logger';
import LoggerRepositoryInterface from '@domain/logger/repository/logger-repository.interface';
import { PrismaClient } from '@prisma/client';

export default class LoggerPrismaRepository implements LoggerRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Logger): Promise<void> {
    await this.prisma.logger.create({
      data: {
        id: entity.id,
        message: entity.message,
        status: entity.status,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  update(entity: Logger): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<Logger> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Logger[]> {
    throw new Error('Method not implemented.');
  }
}
