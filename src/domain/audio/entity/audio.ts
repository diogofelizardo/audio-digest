import Entity from '@domain/shared/entity';

export default class Audio extends Entity {
  private _messageId: string;
  private _audioDuration: number;
  private _mediaContentType0: string;
  private _mediaUrl0: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    messageId: string,
    audioDuration: number,
    mediaContentType0: string,
    mediaUrl0: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this._id = id;
    this._messageId = messageId;
    this._audioDuration = audioDuration;
    this._mediaContentType0 = mediaContentType0;
    this._mediaUrl0 = mediaUrl0;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get messageId(): string {
    return this._messageId;
  }

  get mediaContentType0(): string {
    return this._mediaContentType0;
  }

  get mediaUrl0(): string {
    return this._mediaUrl0;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get audioDuration(): number {
    return this._audioDuration;
  }
}
