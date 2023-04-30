import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	hi: `Hello {name:string}!\nI'm a bot to assist you. Kindly select one of the following languages for our conversation:\nen - English\npt - Português\nes - Spanish`,
	audio: {
		notfound: `Audio not found, send me an audio to start the process!\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).`,
		finished: `Your audio has been processed successfully!\nAudio Summary:\n{summary:string}\nNow your balance is {balance:number} credits`,
		transcription: `Audio Transcription: {transcription:string}`,
		started: `Your audio is being processed, please wait a few seconds!`,
		prompt: `List the main points of this text:`,
	},
	user: {
		balance: `Hey {name:string}! You have {balance:number} credits available in your account.\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nNow you can send me an audio to start the process!`,
		created: `Welcome {name:string}! your account has been created!\nYou have {balance:number} credits available in your account.\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nNow you can send me an audio to start the process!`,
		alreadyregistered: `Welcome {name:string}! you are already registered!\nYou have {balance:number} credits available in your account.\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nNow you can send me an audio to start the process!`,
		insufficientBalance: `You have no suficient balance for that process.\nYour balance is {balance:number} credits\nIf you want to add more credits, please access the link: {link:string}`,
		default: `To start the process, please send an audio!\n{audioMinutes:number} credit will be charged per minute of audio sent (rounded to the nearest second).\nTienes {balance:number} créditos disponibles en tu cuenta.`,
		noBalance: `You have no suficient balance.\nIf you want to add more credits, please access the link: {link:string}`,
	}
}

export default en