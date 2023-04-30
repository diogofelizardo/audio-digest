import { Locales } from "@domain/shared/i18n/i18n-types";
import SystemRules from "@domain/shared/system-rules";
import { v4 as uuid } from "uuid";
import User from "../entity/user";

export default class UserFactory {
  private static dateNow: Date = new Date();

  public static create(profileName: string, whatsappId: string, locale: Locales): User {
    const rules = SystemRules.getInstance();
    return new User(uuid(), profileName, whatsappId, locale, rules.inicialBalance, this.dateNow, this.dateNow);
  }
}