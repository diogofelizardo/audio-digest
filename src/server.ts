import UserPrismaRepository from '@infra/database/prisma/repository/user-prisma.repository';
import { AudioService } from '@infra/service/audio.service';
import TranscriptionWhisperService from '@infra/service/transcription-whisper.service';
import CreateUserUsecase from '@usecase/create-user/create-user.usecase';
import DefaultResponseUsecase from '@usecase/default-response/default-response.usecase';
import GetBalanceUseCase from '@usecase/get-balance/get-balance.usecase';
import ProcessMessageUsecase from '@usecase/process-message/process-message.usecase';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import { Twilio } from 'twilio';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import logger from 'utils/logger';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const upload = multer();
const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/163d357e-29d6-490c-b3c9-ecac0c1a99fa', upload.single('Media'), async (req, res) => {
  const { To, From, NumMedia, MediaContentType0, MediaUrl0, Body, ProfileName, WaId } = req.body;

  if (NumMedia == '1' && MediaContentType0 == 'audio/ogg' && MediaUrl0.length !== 0) {
    logger.info(`User ${WaId} sent an audio!`);
    const audioService = new AudioService();
    const transcriptionService = new TranscriptionWhisperService();
    const processMessageUsecase = new ProcessMessageUsecase(audioService, transcriptionService);
    const outputProcessMessage = await processMessageUsecase.execute(req.body);
    const response = outputProcessMessage.response;

    twilio.messages.create({
      body: response,
      from: To,
      to: From
    });

    res.send(response);
  } else {
    const command = Body.toLowerCase();
    const userPrismaRepository = new UserPrismaRepository();
    var response: string;

    switch (command.toLowerCase()) {
      case 'balance': {
        const getBalanceUseCase = new GetBalanceUseCase(userPrismaRepository);
        const inputGetBalance = {
          profileName: ProfileName,
          whatsappId: WaId,
        }
        const outputGetBalance = await getBalanceUseCase.execute(inputGetBalance);
        response = outputGetBalance.response;
        break;
      }
      case 'english':
      case 'português':
      case 'espanhol': {
        const language: 'en' | 'pt' | 'es' = command == 'english' ? 'en' : command == 'português' ? 'pt' : 'es';
        const createUserUsecase = new CreateUserUsecase(userPrismaRepository);
        const inputCreateUser = {
          profileName: ProfileName,
          whatsappId: WaId,
          language: language,
        };
        const outputCreateUser = await createUserUsecase.execute(inputCreateUser);
        response = outputCreateUser.response;
        logger.info(`User ${WaId} created!`);
        break;
      }
      default: {
        const defaultResponseUsecase = new DefaultResponseUsecase(userPrismaRepository);
        const inputDefaultResponse = {
          profileName: ProfileName,
          whatsappId: WaId,
        }
        const outputDefaultResponse = await defaultResponseUsecase.execute(inputDefaultResponse);
        response = outputDefaultResponse.response;
        logger.info(`User ${WaId} sent a message!`);
        break;
      }
    }

    const twiML = new MessagingResponse();
    twiML.message(response);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiML.toString());
  }
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/hello', (req, res) => {
  res.end('Hello World!');
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.debug(`Server is running on port ${port}`);
});
