import UserPrismaRepository from '@infra/database/prisma/repository/user-prisma.repository';
import { AudioService } from '@infra/service/audio.service';
import TranscriptionWhisperService from '@infra/service/transcription-whisper.service';
import CreateUserUsecase from '@usecase/create-user/create-user.usecase';
import ProcessMessageUsecase from '@usecase/process-message/process-message.usecase';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const audioMinutes = 10;

app.post('/command', upload.single('Media'), async (req, res) => {
  const body = req.body;
  let response = '';

  if (body.NumMedia == '1' && body.MediaContentType0 == 'audio/ogg') {
    const audioService = new AudioService();
    const transcriptionService = new TranscriptionWhisperService();
    const processMessageUsecase = new ProcessMessageUsecase(audioService, transcriptionService);
    const outputProcessMessage = await processMessageUsecase.execute(body);

    response = outputProcessMessage.responseMessage;

  } else {
    const command = body.Body.toLowerCase();
    switch (command) {
      case 'register': {
        const userPrismaRepository = new UserPrismaRepository();
        const createUserUsecase = new CreateUserUsecase(userPrismaRepository);
        const inputCreateUser = {
          profileName: body.ProfileName,
          whatsappId: body.WaId,
        }
        const outputCreateUser = await createUserUsecase.execute(inputCreateUser);

        response = `Hi ${outputCreateUser.profileName}, ${outputCreateUser.response}  
                          \n Your balance is ${outputCreateUser.balance} credits
                          \n For each ${audioMinutes} minutes of audio you will be charged 1 credit
                          \n Now you can send me an audio to start the process!`;
        break;
      }
      case 'balance': {
        response = `Your balance is 10 
                          \n For each ${audioMinutes} minutes of audio you will be charged 1 credit 
                          \n Send me an audio to start the process`;
        break;
      }
      default:
        response = `Hi, Im a bot, follow the list of commmands availble: 
                          \n register - Register your account
                          \n balance - Check your balance `;
        break;
    }
  }

  const twiML = new MessagingResponse();
  twiML.message(response);
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(twiML.toString());
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
