import Audio from '@domain/audio/entity/audio';
import AudioRepositoryInterface from '@domain/audio/repository/audio-repository.interface';
import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

export default class AudioPrismaRepository implements AudioRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(entity: Audio): Promise<void> {
    await this.prisma.audio.create({
      data: {
        id: entity.id,
        messageId: entity.messageId,
        audioDuration: entity.audioDuration,
        mediaContentType0: entity.mediaContentType0,
        mediaUrl0: entity.mediaUrl0,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  update(entity: Audio): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<Audio> {
    const audio = await this.prisma.audio.findUnique({
      where: {
        id,
      },
    });

    if (!audio) throw new Error('Audio not found');

    return new Audio(
      audio.id,
      audio.messageId,
      audio.audioDuration,
      audio.mediaContentType0,
      audio.mediaUrl0,
      audio.createdAt,
      audio.updatedAt,
    );
  }

  findAll(): Promise<Audio[]> {
    throw new Error('Method not implemented.');
  }
}
