export default class MessageProperties {
  readonly smsMessageSid: string;
  readonly numMedia: string;
  readonly profileName: string;
  readonly smsSid: string;
  readonly waId: string;
  readonly smsStatus: string;
  readonly body: string;
  readonly to: string;
  readonly numSegments: string;
  readonly referralNumMedia: string;
  readonly messageSid: string;
  readonly accountSid: string;
  readonly from: string;
  readonly apiVersion: string;

  constructor(properties: {
    SmsMessageSid: string;
    NumMedia: string;
    ProfileName: string;
    SmsSid: string;
    WaId: string;
    SmsStatus: string;
    Body: string;
    To: string;
    NumSegments: string;
    ReferralNumMedia: string;
    MessageSid: string;
    AccountSid: string;
    From: string;
    ApiVersion: string;
  }) {
    this.smsMessageSid = properties.SmsMessageSid;
    this.numMedia = properties.NumMedia;
    this.profileName = properties.ProfileName;
    this.smsSid = properties.SmsSid;
    this.waId = properties.WaId;
    this.smsStatus = properties.SmsStatus;
    this.body = properties.Body;
    this.to = properties.To;
    this.numSegments = properties.NumSegments;
    this.referralNumMedia = properties.ReferralNumMedia;
    this.messageSid = properties.MessageSid;
    this.accountSid = properties.AccountSid;
    this.from = properties.From;
    this.apiVersion = properties.ApiVersion;
  }

  equals(other: MessageProperties): boolean {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}