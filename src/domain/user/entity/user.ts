import Message from '@domain/message/entity/message';
import Entity from '@domain/shared/entity';
import { Locales } from '@domain/shared/i18n/i18n-types';

export default class User extends Entity {
  private _profileName: string;
  private _whatsappId: string;
  private _locale: Locales;
  private _balance: number;
  private _messages: Message[] = [];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    profileName: string,
    whatsappId: string,
    locale: Locales,
    balance: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this._id = id;
    this._profileName = profileName;
    this._whatsappId = whatsappId;
    this._balance = balance;
    this._locale = locale;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  addMessage(message: Message): void {
    this._messages.push(message);
  }

  subtractBalance(amount: number): void {
    if (this._balance - amount < 0) throw new Error('Insufficient balance');
    this._balance -= amount;
  }

  addBalance(amount: number): void {
    this._balance += amount;
  }

  get balance(): number {
    return this._balance;
  }

  get profileName(): string {
    return this._profileName;
  }

  get whatsappId(): string {
    return this._whatsappId;
  }

  get locale(): Locales {
    return this._locale;
  }

  get messages(): Message[] {
    return this._messages;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
