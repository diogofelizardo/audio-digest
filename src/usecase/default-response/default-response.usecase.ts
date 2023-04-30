import L from "@domain/shared/i18n/i18n-node";
import SystemRules from "@domain/shared/system-rules";
import UserRepositoryInterface from "@domain/user/repository/user-repository.interface";
import PhoneValidation from "utils/phoneValidation";
import { InputDefaultResponseDTO, OutputDefaultResponseDTO } from "./default-response.dto";

export default class DefaultResponseUsecase {
  private UserRepository: UserRepositoryInterface;

  constructor(UserRepository: UserRepositoryInterface) {
    this.UserRepository = UserRepository;
  }

  async execute(input: InputDefaultResponseDTO): Promise<OutputDefaultResponseDTO> {
    const findUser = await this.UserRepository.findByWhatsappId(input.whatsappId);
    if (!findUser) {
      const locale = PhoneValidation.getLocale(`+${input.whatsappId}`);
      return {
        response: L[locale].hi({ name: input.profileName })
      }
    }

    const rules = SystemRules.getInstance();
    if (findUser.balance <= 0) {
      return {
        response: L[findUser.locale].user.noBalance({
          audioMinutes: rules.audioMinutes,
          link: findUser.locale == 'pt' ? rules.linkBR : rules.linkUSA
        })
      }
    } else {
      return {
        response: L[findUser.locale].user.default({
          audioMinutes: rules.audioMinutes,
          balance: findUser.balance
        })
      }
    }
  }
}