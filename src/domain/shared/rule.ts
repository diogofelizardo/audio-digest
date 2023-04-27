export default class Rule {
  private _audioMinutes: number = 10;
  private _inicialBalance: number = 10;

  private static instance: Rule;

  private constructor() { }

  public static getInstance(): Rule {
    if (!Rule.instance) {
      Rule.instance = new Rule();
    }

    return Rule.instance;
  }

  get audioMinutes(): number {
    return this._audioMinutes;
  }

  get inicialBalance(): number {
    return this._inicialBalance;
  }

}