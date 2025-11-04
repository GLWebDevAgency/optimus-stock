/**
 * Entity Product - Entité domaine représentant un produit
 * Suit les principes DDD avec invariants et factories
 */
import { Money } from '../value-objects/money';
import { Quantity } from '../value-objects/quantity';
import { ProductName } from '../value-objects/product-name';
import { OutOfStockError } from '../exceptions/product-errors';

export interface ProductProps {
  id: number;
  name: ProductName;
  price: Money;
  stock: Quantity;
  categoryId?: number;
  supplierId?: number;
  sku?: string;
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entité Product du domaine
 * Contient la logique métier pour la gestion des produits
 */
export class Product {
  private constructor(private readonly props: ProductProps) {
    Object.freeze(this);
  }

  /**
   * Factory pour créer un nouveau produit
   */
  static create(params: {
    id: number;
    name: string;
    priceInCents: number;
    stock: number;
    categoryId?: number;
    supplierId?: number;
    sku?: string;
    unit?: string;
  }): Product {
    const now = new Date();

    return new Product({
      id: params.id,
      name: ProductName.create(params.name),
      price: Money.create(params.priceInCents),
      stock: Quantity.create(params.stock),
      categoryId: params.categoryId,
      supplierId: params.supplierId,
      sku: params.sku,
      unit: params.unit || 'unité',
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Factory pour réhydrater depuis la base de données
   */
  static rehydrate(props: ProductProps): Product {
    return new Product(props);
  }

  // Getters
  get id(): number {
    return this.props.id;
  }

  get name(): ProductName {
    return this.props.name;
  }

  get price(): Money {
    return this.props.price;
  }

  get stock(): Quantity {
    return this.props.stock;
  }

  get categoryId(): number | undefined {
    return this.props.categoryId;
  }

  get supplierId(): number | undefined {
    return this.props.supplierId;
  }

  get sku(): string | undefined {
    return this.props.sku;
  }

  get unit(): string {
    return this.props.unit || 'unité';
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  /**
   * Méthode métier: Vérifier si le produit peut satisfaire une commande
   */
  canFulfillOrder(requestedQuantity: Quantity): boolean {
    return this.stock.isSufficientFor(requestedQuantity);
  }

  /**
   * Méthode métier: Réserver du stock (pour une commande)
   */
  reserveStock(quantity: Quantity): Product {
    if (!this.canFulfillOrder(quantity)) {
      throw new OutOfStockError(this.id, quantity.value, this.stock.value);
    }

    return Product.rehydrate({
      ...this.props,
      stock: this.stock.subtract(quantity),
      updatedAt: new Date(),
    });
  }

  /**
   * Méthode métier: Réapprovisionner le stock
   */
  restockInventory(quantity: Quantity): Product {
    return Product.rehydrate({
      ...this.props,
      stock: this.stock.add(quantity),
      updatedAt: new Date(),
    });
  }

  /**
   * Méthode métier: Mettre à jour le prix
   */
  updatePrice(newPrice: Money): Product {
    return Product.rehydrate({
      ...this.props,
      price: newPrice,
      updatedAt: new Date(),
    });
  }

  /**
   * Vérifie si le stock est bas
   */
  isLowStock(threshold: number = 10): boolean {
    return this.stock.isLowStock(threshold);
  }

  /**
   * Égalité basée sur l'identité (ID)
   */
  equals(other: Product): boolean {
    return this.id === other.id;
  }
}
