import MessageProperties from "./message-properties";

describe('MessageProperties', () => {
  const defaultProps = {
    mediaContentType0: 'image/jpeg',
    smsMessageSid: 'SM1234567890',
    numMedia: '1',
    profileName: 'John Doe',
    smsSid: 'SM1234567890',
    waId: '1234567890',
    smsStatus: 'sent',
    body: 'Hello, World!',
    to: '+1234567890',
    numSegments: '1',
    referralNumMedia: '1',
    messageSid: 'MM1234567890',
    accountSid: 'AC1234567890',
    from: '+0987654321',
    mediaUrl0: 'https://example.com/media.jpg',
    apiVersion: '2023-04-22',
  };

  it('should assign properties correctly', () => {
    const messageProperties = new MessageProperties(defaultProps);

    expect(messageProperties).toEqual(defaultProps);
  });

  it('should compare equality correctly', () => {
    const messageProperties1 = new MessageProperties(defaultProps);
    const messageProperties2 = new MessageProperties(defaultProps);

    expect(messageProperties1.equals(messageProperties2)).toBeTruthy();
  });

  it('should compare inequality correctly', () => {
    const messageProperties1 = new MessageProperties(defaultProps);
    const alteredProps = { ...defaultProps, body: 'Hello, Mars!' };
    const messageProperties2 = new MessageProperties(alteredProps);

    expect(messageProperties1.equals(messageProperties2)).toBeFalsy();
  });
});
