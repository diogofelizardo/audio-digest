import Audio from "@domain/audio/entity/audio";
import Entity from "@domain/shared/entity";
import Summary from "@domain/summary/entity/summary";
import Transcription from "@domain/transcription/entity/transcription";
import MessageProperties from "../value-object/message-properties";

export default class Message extends Entity {
  private _userId: string;
  private _properties!: MessageProperties;
  private _transcription!: Transcription;
  private _summary!: Summary;
  private _audio!: Audio;
  private _createdAt: Date;
  private _updatedAt: Date;


  constructor(
    id: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this._id = id;
    this._userId = userId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get userId(): string {
    return this._userId;
  }

  get properties(): MessageProperties {
    return this._properties;
  }

  get transcription(): Transcription {
    return this._transcription;
  }

  get summary(): Summary {
    return this._summary;
  }

  get audio(): Audio {
    return this._audio;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  setAudio(audio: Audio) {
    this._audio = audio;
    this._updatedAt = new Date();
  }

  setTranscription(transcription: Transcription) {
    this._transcription = transcription;
    this._updatedAt = new Date();
  }

  setSummary(summary: Summary) {
    this._summary = summary;
    this._updatedAt = new Date();
  }

  setProperties(properties: MessageProperties) {
    this._properties = properties;
    this._updatedAt = new Date();
  }

  get messageResponse(): any {
    return `Mensagem de retorno do usuário ${this._userId} \n
            Resume: ${this._summary?.text} \n
            Transcription: ${this._transcription?.text}`;
  }

}
