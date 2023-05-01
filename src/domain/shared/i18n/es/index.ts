import { Translation } from "../i18n-types";

const es: Translation = {
	hi: `¡Hola {name:string}!\nSoy un bot desarrollado para ayudarte a convertir audio en texto resumido. Con mi ayuda, puedes obtener un resumen preciso y conciso de lo que se dijo en el audio sin tener que escuchar todo el contenido. Por favor, elige uno de los siguientes idiomas para nuestra conversación:\nEscribe\n- en para inglés\n- pt para portugués\n- es para español`,
	audio: {
		notfound: `Audio no encontrado, ¡envíame un audio para comenzar el proceso!\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).`,
		finished: `¡Su audio ha sido procesado exitosamente!\n\nResumen de audio:\n{summary:string}\n\nAhora su saldo es de {balance:number} créditos\n\nSi desea agregar más créditos, acceda al enlace: {link:string}`,
		transcription: `Transcripción de audio: {transcription:string}`,
		started: `¡Su audio se está procesando, espere unos segundos!`,
		prompt: `Enumere los puntos principales de este texto:`,
	},
	user: {
		balance: `¡Hola {name:string}! Tienes {balance:number} créditos disponibles en tu cuenta.\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).\n¡Ahora puedes enviarme un audio para comenzar el proceso!\n\nSi quieres agregar más créditos, por favor accede al enlace: {link:string}`,
		created: `¡Bienvenido {name:string}!\nTienes {balance:number} créditos disponibles en tu cuenta.\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).\n¡Ahora puedes enviarme un audio para comenzar el proceso!`,
		alreadyregistered: `¡Bienvenido {name:string}! ¡Ya estás registrado!\nTienes {balance:number} créditos disponibles en tu cuenta.\nSe cobrará {audioMinutes:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).\n¡Ahora puedes enviarme un audio para comenzar el proceso!`,
		insufficientBalance: `No tienes saldo suficiente para ese proceso.\nTu saldo es de {balance:number} créditos\nSi quieres agregar más créditos, por favor accede al enlace: {link:string}`,
		default: `¡Para comenzar el proceso, por favor envíe un audio!\nCada audio con una duración de hasta {audioMinutes:number} minutos tendrá un costo de 1 crédito.\n\nTienes {balance:number} créditos disponibles en tu cuenta.\n\nSi desea agregar más créditos, acceda al enlace: {link:string}`,
		noBalance: `No tienes saldo suficiente.\n\nSi desea agregar más créditos, acceda al enlace: {link:string}`,
	}
}


export default es