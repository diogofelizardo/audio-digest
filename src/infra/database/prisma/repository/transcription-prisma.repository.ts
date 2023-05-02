import Transcription from "@domain/transcription/entity/transcription";
import TranscriptionRepositoryInterface from "@domain/transcription/repository/transcription-repository.interface";
import { PrismaClient } from "@prisma/client";
import prisma from '../lib/prisma';

export default class TranscriptionPrismaRepository implements TranscriptionRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(entity: Transcription): Promise<void> {
    await this.prisma.transcription.create({
      data: {
        id: entity.id,
        messageId: entity.messageId,
        text: entity.text,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }
    });
  }
  update(entity: Transcription): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Transcription> {
    const promise = await this.prisma.transcription.findUnique({
      where: {
        id
      }
    });

    if (!promise) throw new Error('Transcription not found');

    return new Transcription(promise.id, promise.messageId, promise.createdAt, promise.updatedAt, promise.text);
  }
  findAll(): Promise<Transcription[]> {
    throw new Error("Method not implemented.");
  }

}