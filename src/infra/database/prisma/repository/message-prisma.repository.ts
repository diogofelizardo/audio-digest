import Message from '@domain/message/entity/message';
import MessageRepositoryInterface from '@domain/message/repository/message-repository.interface';
import { PrismaClient } from '@prisma/client';

export default class MessagePrismaRepository implements MessageRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Message): Promise<void> {
    await this.prisma.message.create({
      data: {
        id: entity.id,
        smsMessageSid: entity.properties.smsMessageSid,
        numMedia: entity.properties.numMedia,
        profileName: entity.properties.profileName,
        smsSid: entity.properties.smsSid,
        waId: entity.properties.waId,
        smsStatus: entity.properties.smsStatus,
        body: entity.properties.body,
        to: entity.properties.to,
        numSegments: entity.properties.numSegments,
        referralNumMedia: entity.properties.referralNumMedia,
        messageSid: entity.properties.messageSid,
        accountSid: entity.properties.accountSid,
        from: entity.properties.from,
        apiVersion: entity.properties.apiVersion,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        transcription: entity.transcription
          ? {
            create: {
              id: entity.transcription.id,
              text: entity.transcription.text,
              createdAt: entity.transcription.createdAt,
              updatedAt: entity.transcription.updatedAt,
            },
          }
          : undefined,
        summary: entity.summary
          ? {
            create: {
              id: entity.summary.id,
              text: entity.summary.text,
              createdAt: entity.summary.createdAt,
              updatedAt: entity.summary.updatedAt,
            },
          }
          : undefined,
        audio: entity.audio
          ? {
            create: {
              id: entity.audio.id,
              audioDuration: entity.audio.audioDuration,
              mediaContentType0: entity.audio.mediaContentType0,
              mediaUrl0: entity.audio.mediaUrl0,
              createdAt: entity.audio.createdAt,
              updatedAt: entity.audio.updatedAt,
            },
          }
          : undefined,
        user: {
          connect: {
            id: entity.userId,
          },
        },
      },
    });
  }
  async update(entity: Message): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}
