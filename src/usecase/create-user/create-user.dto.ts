
export type InputCreateUserDTO = {
  profileName: string,
  whatsappId: string,
  language: 'en' | 'pt' | 'es'
};

export type OutputCreateUserDTO = {
  profileName: string,
  whatsappId: string,
  balance: number
  response: string
}