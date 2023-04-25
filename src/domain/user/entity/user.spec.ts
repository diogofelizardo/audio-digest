import Message from "@domain/message/entity/message";
import MessageProperties from "@domain/message/value-object/message-properties";
import User from "@domain/user/entity/user";

describe("User", () => {
  const dateNow = new Date();
  it("should add message to messages array", () => {
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      dateNow
    );

    const properties = new MessageProperties({
      mediaContentType0: "",
      smsMessageSid: "",
      numMedia: "",
      profileName: "",
      smsSid: "",
      waId: "",
      smsStatus: "",
      body: "",
      to: "",
      numSegments: "",
      referralNumMedia: "",
      messageSid: "",
      accountSid: "",
      from: "",
      mediaUrl0: "",
      apiVersion: ""
    });
    const message = new Message("456", "123", properties, dateNow, dateNow);

    user.addMessage(message);

    expect(user.messages.length).toBe(1);
    expect(user.messages[0]).toBe(message);
  });

  it("should subtract balance from user's balance", () => {
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      dateNow
    );
    user.subtractBalance(50);

    expect(user.balance).toBe(50);
  });

  it("should throw error when subtracting more than user's balance", () => {
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      dateNow
    );
    expect(() => {
      user.subtractBalance(200);
    }).toThrowError("Insufficient balance");
  });

  it("should add balance to user's balance", () => {
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      dateNow
    );
    user.addBalance(50);

    expect(user.balance).toBe(150);
  });

  it("should get user's profile name", () => {
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      dateNow
    );
    expect(user.profileName).toBe("John Doe");
  });

  it("should get user's whatsapp id", () => {
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      dateNow
    );
    expect(user.whatsappId).toBe("1234567890");
  });

  it("should get user's created date", () => {
    const createdAt = dateNow;
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      createdAt,
      dateNow
    );
    expect(user.createdAt).toBe(createdAt);
  });

  it("should get user's updated date", () => {
    const updatedAt = dateNow;
    const user = new User(
      "123",
      "John Doe",
      "1234567890",
      100,
      dateNow,
      updatedAt
    );
    expect(user.updatedAt).toBe(updatedAt);
  });
});
