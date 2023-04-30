import { Translation } from "../i18n-types";

const pt: Translation = {
	hi: `Olá {name:string}!\nEu sou um robô para ajudá-lo. Por favor, escolha um dos seguintes idiomas para nossa conversa:\nen - Inglês\npt - Português\nes - Espanhol`,
	audio: {
		notfound: `Áudio não encontrado, envie um áudio para iniciar o processo!\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).`,
		finished: `Seu áudio foi processado com sucesso!\n\nResumo do áudio:\n{summary:string}\n\nAgora seu saldo é de {balance:number} créditos`,
		transcription: `Transcrição do áudio: {transcription:string}`,
		started: `Seu áudio está sendo processado, aguarde alguns segundos!`,
		prompt: `Liste os principais pontos desse texto:`,
	},
	user: {
		balance: `Olá {name:string}! Você tem {balance:number} créditos disponíveis em sua conta.\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nAgora você pode enviar um áudio para iniciar o processo!`,
		created: `Bem-vindo {name:string}! Sua conta foi criada!\nVocê tem {balance:number} créditos disponíveis em sua conta.\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nAgora você pode enviar um áudio para iniciar o processo!`,
		alreadyregistered: `Bem-vindo {name:string}! Você já está registrado!\nVocê tem {balance:number} créditos disponíveis em sua conta.\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nAgora você pode enviar um áudio para iniciar o processo!`,
		insufficientBalance: `Você não possui saldo suficiente para esse processo.\nSeu saldo é de {balance:number} créditos\nSe deseja adicionar mais créditos, por favor acesse o link: {link:string}`,
		default: `Para iniciar o processo, por favor envie um áudio!\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nSeu saldo é de {balance:number} créditos`,
		noBalance: `Você esta sem saldo.\nSe você quiser adicionar mais créditos, acesse o link: {link:string}`,
	}
}


export default pt