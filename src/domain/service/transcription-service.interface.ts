export default interface TranscriptionServiceInterface {
  transcribeAudio(filePath: string): Promise<string>;
}