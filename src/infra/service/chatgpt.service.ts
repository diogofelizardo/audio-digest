import { Configuration, OpenAIApi } from 'openai';

export default class ChatGPTService {
  private model = 'text-davinci-002';
  private configuration: Configuration;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessageToChatGPT(message: string): Promise<string | undefined> {
    const openai = new OpenAIApi(this.configuration);

    const completion = await openai.createCompletion({
      model: this.model,
      prompt: `Liste os principais pontos desse texto: ${message}`,
    });
    console.log(completion.data.choices);
    return completion.data.choices[0].text;
  }
}