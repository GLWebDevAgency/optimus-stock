/**
 * Erreurs spécifiques au domaine Product
 */
import { BusinessRuleError, DomainValidationError } from './domain-error';

export class InvalidQuantityError extends DomainValidationError {
  constructor(quantity: number) {
    super(`Quantité invalide: ${quantity}. Doit être supérieure à 0.`);
  }
}

export class InvalidPriceError extends DomainValidationError {
  constructor(price: number) {
    super(`Prix invalide: ${price}. Doit être supérieur ou égal à 0.`);
  }
}

export class InvalidProductNameError extends DomainValidationError {
  constructor(name: string) {
    super(`Nom de produit invalide: "${name}". Ne peut pas être vide.`);
  }
}

export class OutOfStockError extends BusinessRuleError {
  constructor(
    public readonly productId: number,
    public readonly requested: number,
    public readonly available: number
  ) {
    super(
      `Stock insuffisant pour produit ${productId}: demandé ${requested}, disponible ${available}`,
      'OUT_OF_STOCK'
    );
  }
}
