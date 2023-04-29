export default class SystemRules {
  private _audioMinutes: number = 1;
  private _inicialBalance: number = 20;
  private _linkBuyCredits: string = 'https://www.google.com';

  private static instance: SystemRules;

  private constructor() { }

  public static getInstance(): SystemRules {
    if (!SystemRules.instance) {
      SystemRules.instance = new SystemRules();
    }

    return SystemRules.instance;
  }

  get audioMinutes(): number {
    return this._audioMinutes;
  }

  get inicialBalance(): number {
    return this._inicialBalance;
  }

  get link(): string {
    return this._linkBuyCredits;
  }

  calculateCost(audioDuration: number): number {
    const oneMinute = 60;
    const cost = Math.round(audioDuration / oneMinute);
    return cost === 0 ? 1 : cost;
  }

  haveEnoughBalance(balance: number, audioDuration: number): boolean {
    return balance >= this.calculateCost(audioDuration);
  }

}