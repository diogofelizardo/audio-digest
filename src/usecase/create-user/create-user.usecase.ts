import L from "@domain/shared/i18n/i18n-node";
import SystemRules from "@domain/shared/system-rules";
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
    const rules = SystemRules.getInstance();

    if (findUser) {
      return {
        profileName: findUser.profileName,
        whatsappId: findUser.whatsappId,
        balance: findUser.balance,
        response: L[findUser.locale].user.alreadyregistered({
          name: findUser.profileName,
          balance: findUser.balance,
          audioMinutes: rules.audioMinutes
        })
      }
    }

    const user = UserFactory.create(input.profileName, input.whatsappId, input.language);

    await this.UserRepository.create(user);

    return {
      profileName: user.profileName,
      whatsappId: user.whatsappId,
      balance: user.balance,
      response: L[user.locale].user.created({
        name: user.profileName,
        balance: user.balance,
        audioMinutes: rules.audioMinutes
      })
    }
  }
}	