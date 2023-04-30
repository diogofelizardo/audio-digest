export default interface AudioServiceInterface {
  loadAudio(url: string): Promise<void>;
  getAudioDuration(): Promise<number | undefined>;
  getAudioMp3Path(): string;
  convertAudioToMp3(): Promise<void>;
  cleanup(): Promise<void>;
}