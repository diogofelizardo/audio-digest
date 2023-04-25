import { v4 as uuid } from "uuid";
import Message from "../entity/message";
import MessageProperties from "../value-object/message-properties";

export default class MessageFactory {
  private static dateNow: Date = new Date();

  public static create(userId: string, audioDuration: number): Message {
    return new Message(uuid(), userId, audioDuration, this.dateNow, this.dateNow);
  }

  public static createWithProperties(userId: string, audioDuration: number, properties: MessageProperties): Message {
    const message = new Message(uuid(), userId, audioDuration, this.dateNow, this.dateNow);
    message.setProperties(properties);
    return message;
  }
}