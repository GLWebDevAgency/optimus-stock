/**
 * Value Object Quantity - Représente une quantité de produit
 * Immutable et sans identité propre
 */
import { InvalidQuantityError } from '../exceptions/product-errors';

export class Quantity {
  private constructor(private readonly amount: number) {
    Object.freeze(this);
  }

  /**
   * Crée une instance de Quantity
   * @param amount - Quantité (doit être > 0)
   */
  static create(amount: number): Quantity {
    if (amount < 0) {
      throw new InvalidQuantityError(amount);
    }

    if (!Number.isInteger(amount)) {
      throw new InvalidQuantityError(amount);
    }

    return new Quantity(amount);
  }

  /**
   * Retourne la valeur de la quantité
   */
  get value(): number {
    return this.amount;
  }

  /**
   * Additionne deux quantités
   */
  add(other: Quantity): Quantity {
    return Quantity.create(this.amount + other.amount);
  }

  /**
   * Soustrait deux quantités
   */
  subtract(other: Quantity): Quantity {
    return Quantity.create(this.amount - other.amount);
  }

  /**
   * Vérifie si la quantité est suffisante
   */
  isSufficientFor(requested: Quantity): boolean {
    return this.amount >= requested.amount;
  }

  /**
   * Égalité par valeur
   */
  equals(other: Quantity): boolean {
    return this.amount === other.amount;
  }

  /**
   * Vérifie si le stock est bas (< seuil)
   */
  isLowStock(threshold: number = 10): boolean {
    return this.amount < threshold;
  }

  /**
   * Formate en string
   */
  toString(): string {
    return this.amount.toString();
  }
}
