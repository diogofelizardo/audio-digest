import UserFactory from "@domain/user/factory/user.factory";
import UserRepositoryInterface from "@domain/user/repository/user-repository.interface";
import { InputCreateUserDTO, OutputCreateUserDTO } from "./create-user.dto";

export default class CreateUserUsecase {
  private UserRepository: UserRepositoryInterface;

  constructor(UserRepository: UserRepositoryInterface) {
    this.UserRepository = UserRepository;
  }

  async execute(input: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const findUser = await this.UserRepository.findByWhatsappId(input.whatsappId);

    if (findUser) {
      return {
        profileName: findUser.profileName,
        whatsappId: findUser.whatsappId,
        balance: findUser.balance,
        response: 'you are already registered!'
      }
    }

    const user = UserFactory.create(input.profileName, input.whatsappId);

    await this.UserRepository.create(user);

    return {
      profileName: user.profileName,
      whatsappId: user.whatsappId,
      balance: user.balance,
      response: 'your account has been created!'
    }
  }
}	