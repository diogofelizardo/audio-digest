import MessageProperties from './message-properties';

describe('MessageProperties', () => {
  const properties = {
    SmsMessageSid: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    NumMedia: '0',
    ProfileName: 'John Doe',
    SmsSid: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    WaId: '15555555555',
    SmsStatus: 'received',
    Body: 'Hello, world!',
    To: 'whatsapp:+14155238886',
    NumSegments: '1',
    ReferralNumMedia: '',
    MessageSid: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    AccountSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    From: 'whatsapp:+15555555555',
    ApiVersion: '2010-04-01',
  };

  let messageProperties: MessageProperties;

  beforeEach(() => {
    messageProperties = new MessageProperties(properties);
  });

  describe('constructor', () => {
    it('should create message properties with the correct values', () => {
      expect(messageProperties.smsMessageSid).toEqual(properties.SmsMessageSid);
      expect(messageProperties.numMedia).toEqual(properties.NumMedia);
      expect(messageProperties.profileName).toEqual(properties.ProfileName);
      expect(messageProperties.smsSid).toEqual(properties.SmsSid);
      expect(messageProperties.waId).toEqual(properties.WaId);
      expect(messageProperties.smsStatus).toEqual(properties.SmsStatus);
      expect(messageProperties.body).toEqual(properties.Body);
      expect(messageProperties.to).toEqual(properties.To);
      expect(messageProperties.numSegments).toEqual(properties.NumSegments);
      expect(messageProperties.referralNumMedia).toEqual(properties.ReferralNumMedia);
      expect(messageProperties.messageSid).toEqual(properties.MessageSid);
      expect(messageProperties.accountSid).toEqual(properties.AccountSid);
      expect(messageProperties.from).toEqual(properties.From);
      expect(messageProperties.apiVersion).toEqual(properties.ApiVersion);
    });
  });

  describe('equals', () => {
    it('should return true when comparing two message properties with the same values', () => {
      const other = new MessageProperties(properties);
      expect(messageProperties.equals(other)).toBe(true);
    });

    it('should return false when comparing two message properties with different values', () => {
      const other = new MessageProperties({ ...properties, Body: 'Goodbye, world!' });
      expect(messageProperties.equals(other)).toBe(false);
    });
  });
});
