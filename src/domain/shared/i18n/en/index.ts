import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	hi: `Hello {name:string}!\nI'm a bot developed to help you convert audio into summarized text. With my help, you can obtain an accurate and concise summary of what was said in the audio without having to listen to the entire content. Please choose one of the following languages for our conversation:\nType\n- en for English\n- pt for Português\n- es for Spanish`,
	audio: {
		notfound: `Audio not found, send me an audio to start the process!\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).`,
		finished: `Your audio has been processed successfully!\n\nAudio Summary:\n{summary:string}\n\nNow your balance is {balance:number} credits`,
		transcription: `Audio Transcription: {transcription:string}`,
		started: `Your audio is being processed, please wait a few seconds!`,
		prompt: `List the main points of this text:`,
	},
	user: {
		balance: `Hey {name:string}! You have {balance:number} credits available in your account.\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nNow you can send me an audio to start the process!\n\nIf you want to add more credits, please access the link: {link:string}`,
		created: `Welcome {name:string}!\nYou have {balance:number} credits available in your account.\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nNow you can send me an audio to start the process!`,
		alreadyregistered: `Welcome {name:string}! you are already registered!\nYou have {balance:number} credits available in your account.\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nNow you can send me an audio to start the process!`,
		insufficientBalance: `You have no suficient balance for that process.\nYour balance is {balance:number} credits\nIf you want to add more credits, please access the link: {link:string}`,
		default: `To start the process, please send an audio!\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\n\nYou have {balance:number} available credits in your account.\n\nIf you want to add more credits, please access the link: {link:string}`,
		noBalance: `You have no suficient balance.\n\nIf you want to add more credits, please access the link: {link:string}`,
	}
}

export default en