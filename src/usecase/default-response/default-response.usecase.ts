import L from "@domain/shared/i18n/i18n-node";
import Rule from "@domain/shared/rule";
import UserRepositoryInterface from "@domain/user/repository/user-repository.interface";
import { InputDefaultResponseDTO, OutputDefaultResponseDTO } from "./default-response.dto";

export default class DefaultResponseUsecase {
  private UserRepository: UserRepositoryInterface;

  constructor(UserRepository: UserRepositoryInterface) {
    this.UserRepository = UserRepository;
  }

  async execute(input: InputDefaultResponseDTO): Promise<OutputDefaultResponseDTO> {
    const findUser = await this.UserRepository.findByWhatsappId(input.whatsappId);

    if (!findUser) {
      return {
        response: L['en'].hi({ name: input.profileName })
      }
    }

    const rule = Rule.getInstance();

    return {
      response: L[findUser.locale].user.default({ audioMinutes: rule.audioMinutes })
    }
  }
}