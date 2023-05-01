import L from "@domain/shared/i18n/i18n-node";
import SystemRules from "@domain/shared/system-rules";
import UserRepositoryInterface from "@domain/user/repository/user-repository.interface";
import PhoneValidation from "utils/phoneValidation";
import { InputGetBalanceDTO, OutputGetBalanceDTO } from "./get-balance.dto";

export default class GetBalanceUseCase {
  private UserRepository: UserRepositoryInterface;

  constructor(UserRepository: UserRepositoryInterface) {
    this.UserRepository = UserRepository;
  }

  async execute(input: InputGetBalanceDTO): Promise<OutputGetBalanceDTO> {
    const findUser = await this.UserRepository.findByWhatsappId(input.whatsappId);

    if (!findUser) {
      const locale = PhoneValidation.getLocale(`+${input.whatsappId}`);
      return {
        response: L[locale].hi({ name: input.profileName })
      };
    }

    const rules = SystemRules.getInstance();
    return {
      response: L[findUser.locale].user.balance({
        name: input.profileName,
        balance: findUser.balance,
        audioMinutes: rules.audioMinutes,
        link: findUser.locale == 'pt' ? rules.linkBR : rules.linkUSA
      })
    };
  }
}