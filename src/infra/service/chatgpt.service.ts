import GPTServiceInterface from '@domain/service/gpt-service.interface';
import { Configuration, OpenAIApi } from 'openai';

export default class ChatGPTService implements GPTServiceInterface {
  private model = 'text-davinci-003';
  private configuration: Configuration;
  private temperature = 0.4;
  private max_tokens = 700;
  private top_p = 0.5;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessageToChatGPT(prompt: string, message: string): Promise<string | undefined> {
    const openai = new OpenAIApi(this.configuration);
    const completion = await openai.createCompletion({
      prompt: `${prompt} ${message}`,
      model: this.model,
      temperature: this.temperature,
      max_tokens: this.max_tokens,
      top_p: this.top_p
    });
    return completion.data.choices[0].text;
  }
}