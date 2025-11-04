/**
 * Value Object Money - Représente une valeur monétaire
 * Immutable et sans identité propre
 */
import { InvalidPriceError } from '../exceptions/product-errors';

export class Money {
  private constructor(
    private readonly amountInCents: number,
    private readonly currencyCode: string
  ) {
    Object.freeze(this);
  }

  /**
   * Crée une instance de Money
   * @param amountInCents - Montant en centimes
   * @param currency - Code devise ISO 4217 (EUR, USD, etc.)
   */
  static create(amountInCents: number, currency: string = 'EUR'): Money {
    if (amountInCents < 0) {
      throw new InvalidPriceError(amountInCents);
    }

    if (!Number.isInteger(amountInCents)) {
      throw new InvalidPriceError(amountInCents);
    }

    return new Money(amountInCents, currency.toUpperCase());
  }

  /**
   * Crée une instance depuis un montant en unité (ex: 15.99 EUR)
   */
  static fromFloat(amount: number, currency: string = 'EUR'): Money {
    const amountInCents = Math.round(amount * 100);
    return Money.create(amountInCents, currency);
  }

  /**
   * Convertit en float (ex: 1599 cents → 15.99)
   */
  toFloat(): number {
    return this.amountInCents / 100;
  }

  /**
   * Retourne le montant en centimes
   */
  get cents(): number {
    return this.amountInCents;
  }

  /**
   * Retourne le code devise
   */
  get currency(): string {
    return this.currencyCode;
  }

  /**
   * Additionne deux montants (même devise)
   */
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amountInCents + other.amountInCents, this.currencyCode);
  }

  /**
   * Soustrait deux montants (même devise)
   */
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amountInCents - other.amountInCents, this.currencyCode);
  }

  /**
   * Multiplie par un nombre
   */
  multiply(factor: number): Money {
    const result = Math.round(this.amountInCents * factor);
    return Money.create(result, this.currencyCode);
  }

  /**
   * Égalité par valeur
   */
  equals(other: Money): boolean {
    return (
      this.amountInCents === other.amountInCents &&
      this.currencyCode === other.currencyCode
    );
  }

  /**
   * Formate en string (ex: "15,99 €")
   */
  format(locale: string = 'fr-FR'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currencyCode,
    }).format(this.toFloat());
  }

  private assertSameCurrency(other: Money): void {
    if (this.currencyCode !== other.currencyCode) {
      throw new Error(
        `Cannot operate on different currencies: ${this.currencyCode} and ${other.currencyCode}`
      );
    }
  }
}
