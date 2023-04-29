import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	hi: `Hello {name:string}!
			\n I'm a bot to assist you. Kindly select one of the following languages for our conversation: 
			\n en - English
			\n pt - Português
			\n es - Spanish`,
	audio: {
		notfound: `Audio not found, send me an audio to start the process!
							\n 1 credit will be charged per minute of audio sent (rounded to the nearest second).`,
		finished: `Your audio has been processed successfully! 
							\n Summary: \n {summary:string}
							\n Transcription: {transcription:string}
							\n Now your balance is {balance:number} credits`,
		prompt: `List the main points of this text:`,
	},
	user: {
		balance: `Hey {name:string}! You have {balance:number} credits available in your account.
						\n 1 credit will be charged per minute of audio sent (rounded to the nearest second).
						\n Now you can send me an audio to start the process!`,

		created: `Welcome {name:string}! your account has been created!
						\n You have {balance:number} credits available in your account.
						\n 1 credit will be charged per minute of audio sent (rounded to the nearest second).
						\n Now you can send me an audio to start the process!`,

		alreadyregistered: `Welcome {name:string}! you are already registered!
											\n You have {balance:number} credits available in your account.
											\n 1 credit will be charged per minute of audio sent (rounded to the nearest second).
											\n Now you can send me an audio to start the process!`,
		insufficientBalance: `You have no suficient balance for that process.
													\n Your balance is {balance:number} credits
													\n If you want to add more credits, please access the link: {link:string}`,
		default: `To start the process, please send an audio! 
						\n 1 credit will be charged per minute of audio sent (rounded to the nearest second).`
	}
}

export default en