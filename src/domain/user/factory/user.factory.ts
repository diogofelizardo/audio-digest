import { v4 as uuid } from "uuid";
import User from "../entity/user";

export default class UserFactory {
  private static dateNow: Date = new Date();
  private static inicialBalance = 10;

  public static create(profileName: string, whatsappId: string): User {
    return new User(uuid(), profileName, whatsappId, this.inicialBalance, this.dateNow, this.dateNow);
  }
}