import { Locales } from "@domain/shared/i18n/i18n-types";
import Rule from "@domain/shared/rule";
import { v4 as uuid } from "uuid";
import User from "../entity/user";

export default class UserFactory {
  private static dateNow: Date = new Date();

  public static create(profileName: string, whatsappId: string, locale: Locales): User {
    const rule = Rule.getInstance();
    return new User(uuid(), profileName, whatsappId, locale, rule.inicialBalance, this.dateNow, this.dateNow);
  }
}