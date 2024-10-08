import AudioServiceInterface from '@domain/service/audio-service.interface';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import logger from 'utils/logger';
import { v4 as uuidv4 } from 'uuid';

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

ffmpeg.setFfmpegPath(ffmpegPath.path);

export class AudioService implements AudioServiceInterface {
  private oggFilePath: string;
  private oggFileName: string;
  private mp3FilePath: string;
  private mp3FileName: string;
  private audioLoaded: boolean = false;

  constructor() {
    const name = uuidv4();
    this.oggFileName = `${name}.ogg`;
    this.mp3FileName = `${name}.mp3`;

    this.oggFilePath = path.join(os.tmpdir(), `${this.oggFileName}`);
    this.mp3FilePath = path.join(os.tmpdir(), `${this.mp3FileName}`);
  }

  async loadAudio(url: string): Promise<void> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const audioBuffer = Buffer.from(response.data);
    await writeFileAsync(this.oggFilePath, audioBuffer);
    this.audioLoaded = true;
  }

  getAudioMp3Path(): string {
    if (!this.audioLoaded) {
      logger.error('Audio file not found, load audio before get path');
      throw new Error('Audio file not found, load audio before get path');
    }
    return this.mp3FilePath;
  }

  async getAudioDuration(): Promise<number | undefined> {
    if (!this.audioLoaded) {
      logger.error('Audio file not found, load audio before get duration');
      throw new Error('Audio file not found, load audio before get duration');
    }

    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(this.oggFilePath, (err, metadata) => {
        if (err) {
          this.cleanup();
          logger.error(`Error while try get audio duration: ${err.message}`);
          reject(err);
        } else {
          resolve(metadata.format.duration);
        }
      });
    });
  }

  async cleanup(): Promise<void> {
    if (!this.audioLoaded) {
      logger.error('Audio file not found, load audio before cleanup');
      throw new Error('Audio file not found, load audio before cleanup');
    }

    if (this.oggFilePath) {
      await unlinkAsync(this.oggFilePath);
      this.oggFilePath = '';
    }
  }

  convertAudioToMp3(): Promise<void> {
    if (!this.audioLoaded) {
      logger.error('Audio file not found, load audio before convert');
      throw new Error('Audio file not found, load audio before convert');
    }

    return new Promise((resolve, reject) => {
      ffmpeg(this.oggFilePath)
        .output(this.mp3FilePath)
        .on('end', () => {
          logger.info('File converted successfully');
          resolve();
        })
        .on('error', (err) => {
          logger.error(`Error while try convert audio: ${err.message}`);
          reject();
        })
        .run();
    });
  }
}
