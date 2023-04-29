import { Translation } from "../i18n-types";

const pt: Translation = {
	hi: `Olá {name:string}!
			\n Eu sou um robô para ajudá-lo. Por favor, escolha um dos seguintes idiomas para nossa conversa:
			\n en - Inglês
			\n pt - Português
			\n es - Espanhol`,
	audio: {
		notfound: `Áudio não encontrado, envie um áudio para iniciar o processo!
							\n Será cobrado {audioDuration:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).`,
		finished: `Seu áudio foi processado com sucesso! 
							\n Resumo: \n {summary:string} 
							\n Transcrição: {transcription:string} 
							\n Agora seu saldo é de {balance:number} créditos`,
		prompt: `Liste os principais pontos desse texto:`,
	},
	user: {
		balance: `Olá {name:string}! Você tem {balance:number} créditos disponíveis em sua conta.
						\n Será cobrado {audioDuration:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).
						\n Agora você pode enviar um áudio para iniciar o processo!`,
		created: `Bem-vindo {name:string}! Sua conta foi criada!
						\n Você tem {balance:number} créditos disponíveis em sua conta.
						\n Será cobrado {audioDuration:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).
						\n Agora você pode enviar um áudio para iniciar o processo!`,
		alreadyregistered: `Bem-vindo {name:string}! Você já está registrado!
											\n Você tem {balance:number} créditos disponíveis em sua conta.
											\n Será cobrado {audioDuration:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).
											\n Agora você pode enviar um áudio para iniciar o processo!`,
		default: `Para iniciar o processo, por favor envie um áudio!
						\n Será cobrado {audioDuration:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).`
	}
}


export default pt