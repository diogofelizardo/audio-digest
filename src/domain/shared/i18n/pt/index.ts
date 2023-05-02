import { Translation } from "../i18n-types";

const pt: Translation = {
	// hi: `Olá {name:string}!\nEu sou um bot desenvolvido para transformar áudio em texto resumido para você. Com a minha ajuda, você pode obter um resumo preciso e conciso do que foi dito no áudio sem precisar ouvir todo o conteúdo. Por favor, escolha um dos seguintes idiomas para nossa conversa:\nDigite\n- en para Inglês\n- pt para Português\n- es para Espanhol`,
	hi: `Olá {name:string}!\nEu sou um bot desenvolvido para transformar áudio em texto resumido para você. Com a minha ajuda, você pode obter um resumo preciso e conciso do que foi dito no áudio sem precisar ouvir todo o conteúdo.\nPor favor, escolha um dos seguintes idiomas para nossa conversa:`,
	audio: {
		notfound: `Áudio não encontrado, envie um áudio para iniciar o processo!\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).`,
		finished: `Seu áudio foi processado com sucesso!\n\nResumo do áudio:\n{summary:string}\n\nAgora seu saldo é de {balance:number} créditos`,
		transcription: `Transcrição do áudio: {transcription:string}`,
		started: `Seu áudio está sendo processado, aguarde alguns segundos!`,
		prompt: `Liste os principais pontos desse texto:`,
		tooShort: `O áudio é muito curto, envie um áudio maior que {minimumAudioDuration:number} segundos para iniciar o processo!`,
	},
	user: {
		balance: `Olá {name:string}! Você tem {balance:number} créditos disponíveis em sua conta.\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nAgora você pode enviar um áudio para iniciar o processo!\n\nSe deseja adicionar mais créditos, por favor acesse o link: {link:string}`,
		created: `Bem-vindo {name:string}!\nVocê tem {balance:number} créditos disponíveis em sua conta.\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nAgora você pode enviar um áudio para iniciar o processo!`,
		alreadyregistered: `Bem-vindo {name:string}! Você já está registrado!\nVocê tem {balance:number} créditos disponíveis em sua conta.\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\nAgora você pode enviar um áudio para iniciar o processo!`,
		insufficientBalance: `Você não possui saldo suficiente para esse processo.\n\nSeu saldo é de {balance:number} créditos\n\nSe deseja adicionar mais créditos, por favor acesse o link: {link:string}`,
		default: `Para iniciar o processo, por favor envie um áudio!\nSerá cobrado {audioMinutes:number} crédito por minuto de áudio enviado (arredondado para o segundo mais próximo).\n\nSeu saldo é de {balance:number} créditos\n\nSe deseja adicionar mais créditos, por favor acesse o link: {link:string}`,
		noBalance: `Você esta sem saldo.\nSe você quiser adicionar mais créditos, acesse o link: {link:string}`,
	}
}


export default pt