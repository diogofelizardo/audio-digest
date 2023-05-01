import Message from '@domain/message/entity/message';
import User from './user';

describe('User', () => {
  const id = 'user-id';
  const profileName = 'John Doe';
  const whatsappId = '+15555555555';
  const locale = 'en';
  const balance = 100;
  const createdAt = new Date();
  const updatedAt = new Date();

  let user: User;

  beforeEach(() => {
    user = new User(id, profileName, whatsappId, locale, balance, createdAt, updatedAt);
  });

  describe('constructor', () => {
    it('should create a user with the correct properties', () => {
      expect(user.id).toEqual(id);
      expect(user.profileName).toEqual(profileName);
      expect(user.whatsappId).toEqual(whatsappId);
      expect(user.locale).toEqual(locale);
      expect(user.balance).toEqual(balance);
      expect(user.createdAt).toEqual(createdAt);
      expect(user.updatedAt).toEqual(updatedAt);
    });
  });

  describe('addMessage', () => {
    it('should add a message to the user', () => {
      const message = new Message('message-id', user.id, new Date(), new Date());
      user.addMessage(message);
      expect(user.messages.length).toEqual(1);
      expect(user.messages[0]).toEqual(message);
    });
  });

  describe('subtractBalance', () => {
    it('should subtract the specified amount from the user balance', () => {
      user.subtractBalance(50);
      expect(user.balance).toEqual(50);
    });

    it('should throw an error if the amount is greater than the user balance', () => {
      expect(() => user.subtractBalance(200)).toThrow('Insufficient balance');
    });
  });

  describe('addBalance', () => {
    it('should add the specified amount to the user balance', () => {
      user.addBalance(50);
      expect(user.balance).toEqual(150);
    });
  });
});
