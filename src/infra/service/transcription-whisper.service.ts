import TranscriptionService from '@domain/service/transcription-service.interface';
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export default class TranscriptionWhisperService implements TranscriptionService {
  private model: string;
  private url: string;

  constructor() {
    this.model = 'whisper-1';
    this.url = 'https://api.openai.com/v1/audio/transcriptions';
  }

  async transcribeAudio(filePath: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', this.model);

    const response: AxiosResponse = await axios.post(this.url, formData, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.text;
  }
}