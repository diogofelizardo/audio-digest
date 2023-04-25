import Summary from "@domain/summary/entity/summary";
import SummaryRepositoryInterface from "@domain/summary/repository/summary-repository.interface";
import { PrismaClient } from "@prisma/client";

export default class SummaryPrismaRepository implements SummaryRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Summary): Promise<void> {
    await this.prisma.summary.create({
      data: {
        id: entity.id,
        messageId: entity.messageId,
        text: entity.text,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
  }
  update(entity: Summary): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Summary> {
    const summary = await this.prisma.summary.findUnique({
      where: {
        id
      }
    });

    if (!summary) throw new Error('Summary not found');

    return new Summary(summary.id, summary.messageId, summary.createdAt, summary.updatedAt, summary.text);
  }
  findAll(): Promise<Summary[]> {
    throw new Error("Method not implemented.");
  }

}