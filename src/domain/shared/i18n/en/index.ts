import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	hi: `Hello {name:string}!
			\n I'm a bot to assist you. Kindly select one of the following languages for our conversation: 
			\n en - English
			\n pt - Português
			\n es - Spanish`,
	audio: {
		notfound: `Audio not found, send me an audio to start the process!
							\n Each audio with a duration of up to {audioMinutes:number} minutes will be charged 1 credit`,
		finished: `Your audio has been processed successfully! 
							\n Summary: \n {summary:string}
							\n Transcription: {transcription:string}
							\n Now your balance is {balance:number} credits`,
		prompt: `List the main points of this text:`,
	},
	user: {
		balance: `Hey {name:string}! You have {balance:number} credits available in your account.
						\n Each audio with a duration of up to {audioMinutes:number} minutes will be charged 1 credit
						\n Now you can send me an audio to start the process!`,

		created: `Welcome {name:string}! your account has been created!
						\n You have {balance:number} credits available in your account.
						\n Each audio with a duration of up to {audioMinutes:number} minutes will be charged 1 credit
						\n Now you can send me an audio to start the process!`,

		alreadyregistered: `Welcome {name:string}! you are already registered!
											\n You have {balance:number} credits available in your account.
											\n Each audio with a duration of up to {audioMinutes:number} minutes will be charged 1 credit
											\n Now you can send me an audio to start the process!`,
		default: `To start the process, please send an audio! 
						\n Each audio with a duration of up to {audioMinutes:number} minutes will be charged 1 credit.`
	}
}

export default en