export default interface GPTServiceInterface {
  sendMessageToChatGPT(prompt: string, message: string): Promise<string | undefined>;
}