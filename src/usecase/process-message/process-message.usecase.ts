import MessageFactory from '@domain/message/factory/message.factory';
import MessageProperties from '@domain/message/value-object/message-properties';
import AudioServiceInterface from '@domain/service/audio-service.interface';
import TranscriptionServiceInterface from '@domain/service/transcription-service.interface';
import SummaryFactory from '@domain/summary/factory/summary.factory';
import TranscriptionFactory from '@domain/transcription/factory/transcription.factory';
import MessagePrismaRepository from '@infra/database/prisma/repository/message-prisma.repository';
import SummaryPrismaRepository from '@infra/database/prisma/repository/summary-prisma.repository';
import UserPrismaRepository from '@infra/database/prisma/repository/user-prisma.repository';
import AudioPrismaRepository from '@infra/database/prisma/repository/audio-prisma.repository';
import ChatGPTService from '@infra/service/chatgpt.service';
import { InputMessageDTO, OutputMessageDTO } from './process-message.dto';
import AudioFactory from '@domain/audio/factory/audio.factory';

export default class ProcessMessageUsecase {
  private audioService: AudioServiceInterface;
  private transcriptionService: TranscriptionServiceInterface;

  constructor(audioService: AudioServiceInterface, transcriptionService: TranscriptionServiceInterface) {
    this.audioService = audioService;
    this.transcriptionService = transcriptionService;
  }

  async execute(input: InputMessageDTO): Promise<OutputMessageDTO> {
    if (input.MediaContentType0 !== 'audio/ogg') {
      return {
        responseMessage: `Audio not found, send me an audio to start the process!`,
      };
    }

    if (input.NumMedia !== '1') {
      return {
        responseMessage: `Audio not found, send me an audio to start the process!`,
      };
    }

    const userRepository = new UserPrismaRepository();
    const userFind = await userRepository.findByWhatsappId(input.WaId);

    if (!userFind) {
      return {
        responseMessage: `User not found, send register command!`,
      };
    }

    try {
      await this.audioService.loadAudio(input.MediaUrl0);
      await this.audioService.convertAudioToMp3();
      const audioDuration = await this.audioService.getAudioDuration();
      const audioPath = this.audioService.getAudioMp3Path();

      if (!audioDuration) {
        throw new Error('Audio duration not found');
      }

      const audioTranscription = await this.transcriptionService.transcribeAudio(audioPath);

      if (!audioTranscription) {
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
      const audioSummary = await chatgpt.sendMessageToChatGPT(audioTranscription);

      const summary = SummaryFactory.create(message.id, audioSummary);
      const summaryRepository = new SummaryPrismaRepository();
      await summaryRepository.create(summary);

      return {
        responseMessage: `Your audio has been processed successfully! 
          \n Summary: ${audioSummary}
          \n Transcription: ${audioTranscription}
          \n Now your balance is ${userFind.balance} credits`,
      };
    } catch (error: any) {
      throw new Error(error);
    } finally {
      this.audioService.cleanup();
    }
  }
}
