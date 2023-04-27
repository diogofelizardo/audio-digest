import MessageFactory from "@domain/message/factory/message.factory";
import MessageProperties from "@domain/message/value-object/message-properties";
import AudioServiceInterface from "@domain/service/audio-service.interface";
import TranscriptionServiceInterface from "@domain/service/transcription-service.interface";
import L from "@domain/shared/i18n/i18n-node";
import Rule from "@domain/shared/rule";
import SummaryFactory from "@domain/summary/factory/summary.factory";
import TranscriptionFactory from "@domain/transcription/factory/transcription.factory";
import MessagePrismaRepository from "@infra/database/prisma/repository/message-prisma.repository";
import SummaryPrismaRepository from "@infra/database/prisma/repository/summary-prisma.repository";
import UserPrismaRepository from "@infra/database/prisma/repository/user-prisma.repository";
import ChatGPTService from "@infra/service/chatgpt.service";
import { InputMessageDTO, OutputMessageDTO } from "./process-message.dto";

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

    if (!userFind) {
      return {
        response: L['en'].hi({ name: input.ProfileName })
      };
    }

    if (input.MediaContentType0 !== 'audio/ogg' || input.NumMedia !== '1' || !input.MediaUrl0) {
      const rule = Rule.getInstance();

      return {
        response: L[userFind.locale].audio.notfound({ audioMinutes: rule.audioMinutes })
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


      const messageRepository = new MessagePrismaRepository();
      const message = MessageFactory.createWithProperties(
        userFind.id,
        audioDuration,
        new MessageProperties(input)
      );

      const transcription = TranscriptionFactory.create(message.id, audioTranscription);

      message.setTranscription(transcription);
      await messageRepository.create(message);


      const chatgpt = new ChatGPTService();
      const audioSummary = await chatgpt.sendMessageToChatGPT(
        L[userFind.locale].audio.prompt(),
        audioTranscription
      );

      const summary = SummaryFactory.create(message.id, audioSummary);
      const summaryRepository = new SummaryPrismaRepository();
      await summaryRepository.create(summary);

      if (!audioSummary) {
        throw new Error('Audio summary not found');
      }

      return {
        response: L[userFind.locale].audio.finished({
          summary: audioSummary,
          transcription: audioTranscription,
          balance: userFind.balance,
        })
      }
    } catch (error) {
      throw new Error(`Error processing message : ${(error as Error).message}`);
    } finally {
      this.audioService.cleanup();
    }
  }
}