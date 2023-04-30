import { v4 as uuid } from "uuid";
import Transcription from "../entity/transcription";

export default class TranscriptionFactory {
  private static dateNow: Date = new Date();

  public static create(messageId: string, text?: string): Transcription {
    return new Transcription(uuid(), messageId, this.dateNow, this.dateNow, text);
  }
}