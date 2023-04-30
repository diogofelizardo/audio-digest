import L from "@domain/shared/i18n/i18n-node";
import UserRepositoryInterface from "@domain/user/repository/user-repository.interface";
import { InputGetBalanceDTO, OutputGetBalanceDTO } from "./get-balance.dto";

export default class GetBalanceUseCase {
  private UserRepository: UserRepositoryInterface;

  constructor(UserRepository: UserRepositoryInterface) {
    this.UserRepository = UserRepository;
  }

  async execute(input: InputGetBalanceDTO): Promise<OutputGetBalanceDTO> {
    const findUser = await this.UserRepository.findByWhatsappId(input.whatsappId);

    if (!findUser) {
      return {
        response: L['en'].hi({ name: input.profileName })
      };
    }

    return {
      profileName: findUser.profileName,
      whatsappId: findUser.whatsappId,
      balance: findUser.balance,
      response: L[findUser.locale].user.balance({
        name: input.profileName,
        balance: findUser.balance
      })
    };
  }
}