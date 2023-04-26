import { Configuration, OpenAIApi } from 'openai';

export default class ChatGPTService {
  private model = 'text-davinci-003';
  private configuration: Configuration;
  private temperature = 0.4;
  private max_tokens = 200;
  private top_p = 0.5;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessageToChatGPT(message: string): Promise<string | undefined> {
    const openai = new OpenAIApi(this.configuration);

    const completion = await openai.createCompletion({
      prompt: `Liste os principais pontos desse texto: ${message}`,
      model: this.model,
      temperature: this.temperature,
      max_tokens: this.max_tokens,
      top_p: this.top_p
    });
    console.log(completion.data.choices);
    return completion.data.choices[0].text;
  }
}