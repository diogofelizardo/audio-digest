import { v4 as uuid } from "uuid";
import Summary from "../entity/summary";

export default class SummaryFactory {
  private static dateNow: Date = new Date();

  public static create(messageId: string, text?: string): Summary {
    return new Summary(uuid(), messageId, this.dateNow, this.dateNow, text);
  }
}