import { parsePhoneNumber } from "libphonenumber-js";

export default class PhoneValidation {
  public static isForeignNumber(phoneNumber: string): boolean {
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber);
      if (parsedNumber?.isValid()) {
        const country = parsedNumber?.country;
        if (country && country !== 'BR') {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  public static getLocale(phoneNumber: string): 'en' | 'pt' {
    if (this.isForeignNumber(phoneNumber)) {
      return 'en';
    }
    return 'pt';
  }
}