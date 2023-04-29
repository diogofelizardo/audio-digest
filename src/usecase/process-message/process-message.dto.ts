export type InputMessageDTO = {
  MediaContentType0: string,
  SmsMessageSid: string,
  NumMedia: string,
  ProfileName: string,
  SmsSid: string,
  WaId: string,
  SmsStatus: string,
  Body: string,
  To: string,
  NumSegments: string,
  ReferralNumMedia: string,
  MessageSid: string,
  AccountSid: string,
  From: string,
  MediaUrl0: string,
  ApiVersion: string
};

export type OutputMessageDTO = {
  response: {
    text: string,
    transcription?: string
  }
};