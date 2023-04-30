import Entity from '@domain/shared/entity';

export default class Logger extends Entity {
  private _message: string;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id: string, message: string, status: string, createdAt: Date, updatedAt: Date) {
    super();
    this._id = id;
    this._message = message;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get message(): string {
    return this._message;
  }

  get status(): string {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
