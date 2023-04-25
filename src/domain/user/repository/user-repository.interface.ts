import RepositoryInterface from "@domain/shared/repository.interface";
import User from "../entity/user";

export default interface UserRepositoryInterface extends RepositoryInterface<User> {
  findByWhatsappId(whatsappId: string): Promise<User | undefined>;
}

