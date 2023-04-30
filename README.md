# Digest Audio Project
### Project Description
The Digest Audio Project is an innovative application designed to automatically generate summarized transcripts of WhatsApp voice messages using Twilio, Whisper, and ChatGPT. This project aims to help users save time and stay organized by providing them with a concise and easily accessible overview of the content of their voice messages.

### Features

- Automatic transcription of WhatsApp voice messages using Twilio API

- Audio-to-text conversion using Whisper ASR (Automatic Speech Recognition) system

- Summarization of transcriptions using ChatGPT language model

- Storage and retrieval of summarized transcripts for future reference



### Prerequisites

Before you begin, ensure you have met the following requirements:

A Twilio account with an active phone number and API credentials

Access to Whisper ASR API

Access to ChatGPT API

Node.js (14.x or higher) installed

npm (Node Package Manager) installed

### Installation

#### Clone this repository:

```
bash
git clone https://github.com/diogofelizardo/audio-digest.git
```

#### Navigate to the project directory:

```
bash
cd audio-digest
```

#### Install required dependencies:

```
npm install
```

#### Compile TypeScript code:

```
npm run build
```

### Configuration
Create a .env file in the project root directory:
```
bash
touch .env
```

Open .env and add the following environment variables with your Database, and OpenAI API credentials:

```
DATABASE_URL=postgresql://root:password@localhost:5432/database?schema=public
OPENAI_API_KEY=your_chatgpt_api_key
```

### Usage

Run the main script:
npm run dev

Follow the on-screen instructions to connect your WhatsApp account to the application.

Send a voice message to the Twilio phone number associated with your account.

Wait for the application to process and summarize the audio message.

Check your WhatsApp account for a reply containing the summarized transcript.

### Contributing
If you would like to contribute to the Digest Audio Project, please follow these steps:

### Fork the repository

Create a new branch (git checkout -b your-feature-branch)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin your-feature-branch)

Create a new Pull Request

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contact
If you have any questions, feel free to reach out to me at:

Email: felizardo.diogo@gmail.com
Instagram: @diogofelizardo
