/**
 * Value Object ProductName - Représente le nom d'un produit
 * Immutable et avec validation
 */
import { InvalidProductNameError } from '../exceptions/product-errors';

export class ProductName {
  private constructor(private readonly name: string) {
    Object.freeze(this);
  }

  /**
   * Crée une instance de ProductName
   * @param name - Nom du produit (non vide, max 200 caractères)
   */
  static create(name: string): ProductName {
    const trimmed = name.trim();

    if (trimmed.length === 0) {
      throw new InvalidProductNameError(name);
    }

    if (trimmed.length > 200) {
      throw new InvalidProductNameError(name);
    }

    return new ProductName(trimmed);
  }

  /**
   * Retourne la valeur du nom
   */
  get value(): string {
    return this.name;
  }

  /**
   * Égalité par valeur (case insensitive)
   */
  equals(other: ProductName): boolean {
    return this.name.toLowerCase() === other.name.toLowerCase();
  }

  /**
   * Formate en string
   */
  toString(): string {
    return this.name;
  }
}
