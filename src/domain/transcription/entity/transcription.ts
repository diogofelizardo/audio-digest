import Entity from "@domain/shared/entity";

export default class Transcription extends Entity {
  private _text: string;
  private _messageId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    messageId: string,
    createdAt: Date,
    updatedAt: Date,
    text?: string
  ) {
    super();
    this._id = id;
    this._text = text || "";
    this._messageId = messageId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get messageId(): string {
    return this._messageId;
  }

  get text(): string {
    return this._text;
  }

  set setText(text: string) {
    this._text = text;
    this._updatedAt = new Date();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

}