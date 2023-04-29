import L from '@domain/shared/i18n/i18n-node';
import UserPrismaRepository from '@infra/database/prisma/repository/user-prisma.repository';
import { AudioService } from '@infra/service/audio.service';
import ChatGPTService from '@infra/service/chatgpt.service';
import TranscriptionWhisperService from '@infra/service/transcription-whisper.service';
import CreateUserUsecase from '@usecase/create-user/create-user.usecase';
import DefaultResponseUsecase from '@usecase/default-response/default-response.usecase';
import GetBalanceUseCase from '@usecase/get-balance/get-balance.usecase';
import ProcessMessageUsecase from '@usecase/process-message/process-message.usecase';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import logger from 'utils/logger';

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/command', upload.single('Media'), async (req, res) => {
  const body = req.body;
  let response = '';

  if (body.NumMedia == '1' && body.MediaContentType0 == 'audio/ogg' && body.MediaUrl0.length !== 0) {
    logger.info(`User ${body.WaId} sent an audio!`);
    const audioService = new AudioService();
    const transcriptionService = new TranscriptionWhisperService();
    const processMessageUsecase = new ProcessMessageUsecase(audioService, transcriptionService);
    const outputProcessMessage = await processMessageUsecase.execute(body);

    response = outputProcessMessage.response;
  } else {
    const command = body.Body.toLowerCase();
    const userPrismaRepository = new UserPrismaRepository();

    switch (command) {
      case 'balance': {
        const getBalanceUseCase = new GetBalanceUseCase(userPrismaRepository);
        const inputGetBalance = {
          profileName: body.ProfileName,
          whatsappId: body.WaId,
        };
        const outputGetBalance = await getBalanceUseCase.execute(inputGetBalance);
        response = outputGetBalance.response;
        break;
      }
      case 'en':
      case 'pt':
      case 'es': {
        const createUserUsecase = new CreateUserUsecase(userPrismaRepository);
        const inputCreateUser = {
          profileName: body.ProfileName,
          whatsappId: body.WaId,
          language: command,
        };
        const outputCreateUser = await createUserUsecase.execute(inputCreateUser);

        response = outputCreateUser.response;

        logger.info(`User ${body.WaId} created!`);

        break;
      }
      default: {
        const defaultResponseUsecase = new DefaultResponseUsecase(userPrismaRepository);
        const inputDefaultResponse = {
          profileName: body.ProfileName,
          whatsappId: body.WaId,
        };
        const outputDefaultResponse = await defaultResponseUsecase.execute(inputDefaultResponse);
        response = outputDefaultResponse.response;

        logger.info(`User ${body.WaId} sent a message!`);

        break;
      }
    }
  }

  const twiML = new MessagingResponse();
  twiML.message(response);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiML.toString());
});

// endpoint to test the ChatGPTService apart from Other services
app.get('/summary', (req, res) => {
  const text = req.body.text;
  const chatGPT = new ChatGPTService();
  const summaryText = chatGPT.sendMessageToChatGPT(L['en'].audio.prompt(), text);
  res.send(summaryText);
});

app.get('/locale', (req, res) => {
  const en = L['en'].hi({ name: 'John' });
  const es = L['es'].hi({ name: 'John' });
  const pt = L['pt'].hi({ name: 'John' });
  const msg = { en, es, pt };
  res.send(msg);
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.debug(`Server is running on port ${port}`);
});
