import Transcription from "./transcription";


describe("Transcription entity", () => {
  it("should create a new transcription object", () => {
    const transcription = new Transcription("123", "Hello world!");
    expect(transcription).toBeInstanceOf(Transcription);
    expect(transcription.text).toBe("Hello world!");
  });

  it("should update transcription text and updatedAt when calling setTranscription method", () => {
    const transcription = new Transcription("123", "Hello world!");
    transcription.setTranscription = "Updated text";
    expect(transcription.text).toBe("Updated text");
    expect(transcription.updatedAt).not.toBe(transcription.createdAt);
  });
});
