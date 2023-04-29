import { Translation } from "../i18n-types";

const es: Translation = {
	hi: `¡Hola {name:string}!
			\n Soy un bot para ayudarte. Por favor, elige uno de los siguientes idiomas para nuestra conversación:
			\n en - Inglés
			\n pt - Portugués
			\n es - Español`,
	audio: {
		notfound: `Audio no encontrado, ¡envíame un audio para comenzar el proceso!
							\n Se cobrará {audioDuration:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).`,
		finished: `¡Su audio ha sido procesado exitosamente! 
							\n Resumen: \n {summary:string} 
							\n Transcripción: {transcription:string} 
							\n Ahora su saldo es de {balance:number} créditos`,
		prompt: `Enumere los puntos principales de este texto:`,
	},
	user: {
		balance: `¡Hola {name:string}! Tienes {balance:number} créditos disponibles en tu cuenta.
						\n Se cobrará {audioDuration:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).
						\n ¡Ahora puedes enviarme un audio para comenzar el proceso!`,

		created: `¡Bienvenido {name:string}! ¡Tu cuenta ha sido creada!
						\n Tienes {balance:number} créditos disponibles en tu cuenta.
						\n Se cobrará {audioDuration:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).
						\n ¡Ahora puedes enviarme un audio para comenzar el proceso!`,

		alreadyregistered: `¡Bienvenido {name:string}! ¡Ya estás registrado!
											\n Tienes {balance:number} créditos disponibles en tu cuenta.
											\n Se cobrará {audioDuration:number} crédito por cada minuto de audio enviado (con redondeo al segundo más cercano).
											\n ¡Ahora puedes enviarme un audio para comenzar el proceso!`,
		default: `¡Para comenzar el proceso, por favor envíe un audio! 
						\n Cada audio con una duración de hasta {audioMinutes:number} minutos tendrá un costo de 1 crédito.`
	}
}


export default es