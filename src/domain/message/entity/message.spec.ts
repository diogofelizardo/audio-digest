// import MessageProperties from "../value-object/message-properties";
// import Message from "./message";

// describe("Message", () => {
//   it("should create a new Audio instance with the provided id and properties", () => {
//     const messageId = "test_id";
//     const userId = "test_user_id";
//     const messageProperties = new MessageProperties({
//       mediaContentType0: "audio/mp3",
//       smsMessageSid: "SM12345",
//       numMedia: "1",
//       profileName: "John Doe",
//       smsSid: "SM67890",
//       waId: "123456789",
//       smsStatus: "received",
//       body: "Test audio",
//       to: "+1234567890",
//       numSegments: "1",
//       referralNumMedia: "0",
//       messageSid: "MM12345",
//       accountSid: "AC12345",
//       from: "+0987654321",
//       mediaUrl0: "https://example.com/audio.mp3",
//       apiVersion: "2021-09",
//     });

//     const message = new Message(messageId, userId, messageProperties, new Date(), new Date());

//     expect(message).toBeDefined();
//     expect(message.properties.equals(messageProperties)).toBeTruthy();
//     expect(message.createdAt).toBeInstanceOf(Date);
//     expect(message.updatedAt).toBeInstanceOf(Date);
//   });
// });
