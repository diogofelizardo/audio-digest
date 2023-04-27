import TranscriptionService from '@domain/service/transcription-service.interface';
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export default class TranscriptionWhisperService implements TranscriptionService {

  private model: string;

  constructor() {
    this.model = 'whisper-1';
  }

  async transcribeAudio(filePath: string): Promise<string> {
    const url = 'https://api.openai.com/v1/audio/transcriptions';

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', this.model);

    const response: AxiosResponse = await axios.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.text;
  }
}