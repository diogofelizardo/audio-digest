export type InputCreateUserDTO = {
  profileName: string,
  whatsappId: string
};

export type OutputCreateUserDTO = {
  profileName: string,
  whatsappId: string,
  balance: number
  response: string
}