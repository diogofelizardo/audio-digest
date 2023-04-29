import MessageFactory from '@domain/message/factory/message.factory';
import MessageProperties from '@domain/message/value-object/message-properties';
import AudioServiceInterface from '@domain/service/audio-service.interface';
import TranscriptionServiceInterface from '@domain/service/transcription-service.interface';
import L from '@domain/shared/i18n/i18n-node';
import SystemRules from '@domain/shared/system-rules';
import SummaryFactory from '@domain/summary/factory/summary.factory';
import TranscriptionFactory from '@domain/transcription/factory/transcription.factory';
import MessagePrismaRepository from '@infra/database/prisma/repository/message-prisma.repository';
import SummaryPrismaRepository from '@infra/database/prisma/repository/summary-prisma.repository';
import UserPrismaRepository from '@infra/database/prisma/repository/user-prisma.repository';
import ChatGPTService from '@infra/service/chatgpt.service';
import { InputMessageDTO, OutputMessageDTO } from './process-message.dto';
import AudioPrismaRepository from '@infra/database/prisma/repository/audio-prisma.repository';
import AudioFactory from '@domain/audio/factory/audio.factory';
import logger from 'utils/logger';

export default class ProcessMessageUsecase {
  private audioService: AudioServiceInterface;
  private transcriptionService: TranscriptionServiceInterface;

  constructor(audioService: AudioServiceInterface, transcriptionService: TranscriptionServiceInterface) {
    this.audioService = audioService;
    this.transcriptionService = transcriptionService;
  }

  async execute(input: InputMessageDTO): Promise<OutputMessageDTO> {
    const userRepository = new UserPrismaRepository();
    const userFind = await userRepository.findByWhatsappId(input.WaId);
    const rules = SystemRules.getInstance();

    if (!userFind) {
      return {
        response: L['en'].hi({ name: input.ProfileName }),
      };
    }

    if (input.MediaContentType0 !== 'audio/ogg' || input.NumMedia !== '1' || !input.MediaUrl0) {
      return {
        response: L[userFind.locale].audio.notfound({ audioMinutes: rules.audioMinutes }),
      };
    }

    try {
      await this.audioService.loadAudio(input.MediaUrl0);
      await this.audioService.convertAudioToMp3();
      const audioDuration = await this.audioService.getAudioDuration();
      const audioPath = this.audioService.getAudioMp3Path();

      if (!audioDuration) {
        logger.error('Audio duration not found');
        throw new Error('Audio duration not found');
      }

      if (!rules.haveEnoughBalance(userFind.balance, audioDuration)) {
        return {
          response: L[userFind.locale].user.insufficientBalance({
            balance: userFind.balance,
            link: rules.link,
          }),
        };
      }

      const audioTranscription = await this.transcriptionService.transcribeAudio(audioPath);

      if (!audioTranscription) {
        logger.error('Audio transcription not found');
        throw new Error('Audio transcription not found');
      }

      const audioRepository = new AudioPrismaRepository();
      const audio = AudioFactory.create(input.MessageSid, audioDuration, input.MediaContentType0, input.MediaUrl0);
      await audioRepository.create(audio);

      const messageRepository = new MessagePrismaRepository();
      const message = MessageFactory.createWithProperties(
        userFind.id,
        new MessageProperties({
          SmsMessageSid: input.SmsMessageSid,
          NumMedia: input.NumMedia,
          ProfileName: input.ProfileName,
          SmsSid: input.SmsSid,
          WaId: input.WaId,
          SmsStatus: input.SmsStatus,
          Body: input.Body,
          To: input.To,
          NumSegments: input.NumSegments,
          ReferralNumMedia: input.ReferralNumMedia,
          MessageSid: input.MessageSid,
          AccountSid: input.AccountSid,
          From: input.From,
          ApiVersion: input.ApiVersion,
        }),
      );

      const transcription = TranscriptionFactory.create(message.id, audioTranscription);

      message.setTranscription(transcription);
      await messageRepository.create(message);

      const chatgpt = new ChatGPTService();
      const audioSummary = await chatgpt.sendMessageToChatGPT(L[userFind.locale].audio.prompt(), audioTranscription);

      const summary = SummaryFactory.create(message.id, audioSummary);
      const summaryRepository = new SummaryPrismaRepository();
      await summaryRepository.create(summary);

      if (!audioSummary) {
        logger.error('Audio summary not found');
        throw new Error('Audio summary not found');
      }

      userFind.subtractBalance(rules.calculateCost(audioDuration));
      userRepository.update(userFind);

      return {
        response: L[userFind.locale].audio.finished({
          summary: audioSummary,
          transcription: audioTranscription,
          balance: userFind.balance,
        }),
      };
    } catch (error) {
      logger.error(`Error processing message : ${(error as Error).message}`);
      throw new Error(`Error processing message : ${(error as Error).message}`);
    } finally {
      this.audioService.cleanup();
    }
  }
}
