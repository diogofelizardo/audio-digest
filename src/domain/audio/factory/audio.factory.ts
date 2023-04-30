import { v4 as uuid } from 'uuid';
import Audio from '../entity/audio';

export default class AudioFactory {
  private static dateNow: Date = new Date();

  public static create(messageId: string, audioDuration: number, mediaContentType0: string, mediaUrl0: string): Audio {
    return new Audio(uuid(), messageId, audioDuration, mediaContentType0, mediaUrl0, this.dateNow, this.dateNow);
  }
}
