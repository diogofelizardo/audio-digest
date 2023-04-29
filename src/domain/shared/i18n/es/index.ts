import { Translation } from "../i18n-types";

const es: Translation = {
	hi: `¡Hola {name:string}!\nSoy un bot para ayudarte. Por favor, elige uno de los siguientes idiomas para nuestra conversación:\nen - Inglés\npt - Portugués\nes - Español`,
	audio: {
		notfound: `Audio no encontrado, ¡envíame un audio para comenzar el proceso!\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).`,
		finished: `¡Su audio ha sido procesado exitosamente!\nResumen de audio:\n{summary:string}\nAhora su saldo es de {balance:number} créditos`,
		transcription: `Transcripción de audio: {transcription:string}`,
		started: `¡Su audio se está procesando, espere unos segundos!`,
		prompt: `Enumere los puntos principales de este texto:`,
	},
	user: {
		balance: `¡Hola {name:string}! Tienes {balance:number} créditos disponibles en tu cuenta.\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).\n¡Ahora puedes enviarme un audio para comenzar el proceso!`,
		created: `¡Bienvenido {name:string}! ¡Tu cuenta ha sido creada!\nTienes {balance:number} créditos disponibles en tu cuenta.\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).\n¡Ahora puedes enviarme un audio para comenzar el proceso!`,
		alreadyregistered: `¡Bienvenido {name:string}! ¡Ya estás registrado!\nTienes {balance:number} créditos disponibles en tu cuenta.\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).\n¡Ahora puedes enviarme un audio para comenzar el proceso!`,
		insufficientBalance: `No tienes saldo suficiente para ese proceso.\nTu saldo es de {balance:number} créditos\nSi quieres agregar más créditos, por favor accede al enlace: {link:string}`,
		default: `¡Para comenzar el proceso, por favor envíe un audio!\nCada audio con una duración de hasta {audioMinutes:number} minutos tendrá un costo de 1 crédito.\nTienes {balance:number} créditos disponibles en tu cuenta.`,
		noBalance: `No tienes saldo suficiente.\nSi desea agregar más créditos, acceda al enlace: {link:string}`,
	}
}


export default es