import Transcription from './transcription';

describe('Transcription', () => {
  const id = 'transcription-id';
  const messageId = 'message-id';
  const createdAt = new Date();
  const updatedAt = new Date();
  const text = 'Hello, world!';

  let transcription: Transcription;

  beforeEach(() => {
    transcription = new Transcription(id, messageId, createdAt, updatedAt, text);
  });

  describe('constructor', () => {
    it('should create a transcription with the correct properties', () => {
      expect(transcription.id).toEqual(id);
      expect(transcription.messageId).toEqual(messageId);
      expect(transcription.createdAt).toEqual(createdAt);
      expect(transcription.updatedAt).toEqual(updatedAt);
      expect(transcription.text).toEqual(text);
    });

    it('should create a transcription with an empty text if not provided', () => {
      const transcriptionWithoutText = new Transcription(id, messageId, createdAt, updatedAt);
      expect(transcriptionWithoutText.text).toEqual('');
    });
  });

  describe('setText', () => {
    it('should set the text property and update the updatedAt property', () => {
      const newText = 'Goodbye, world!';
      const previousUpdatedAt = transcription.updatedAt.getTime();
      transcription.setText = newText;
      expect(transcription.text).toEqual(newText);
      expect(transcription.updatedAt.getTime()).toBeGreaterThan(previousUpdatedAt);
    });
  });
});
