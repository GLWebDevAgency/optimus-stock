/**
 * Entity Order - Entité domaine représentant une commande fournisseur
 */
import { Money } from '../value-objects/money';
import { Quantity } from '../value-objects/quantity';

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: Quantity;
  unitPrice: Money;
}

export interface OrderProps {
  id: number;
  orderNumber: string;
  tenantId: number;
  siteId: number;
  supplierId: number;
  items: OrderItem[];
  status: OrderStatus;
  deliveryDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

/**
 * Entité Order du domaine
 */
export class Order {
  private constructor(private readonly props: OrderProps) {
    Object.freeze(this);
  }

  /**
   * Factory pour créer une nouvelle commande
   */
  static create(params: {
    id: number;
    tenantId: number;
    siteId: number;
    supplierId: number;
    items: Array<{
      productId: number;
      productName: string;
      quantity: number;
      unitPriceInCents: number;
    }>;
    deliveryDate: Date;
    notes?: string;
  }): Order {
    const now = new Date();
    const orderNumber = Order.generateOrderNumber();

    const orderItems: OrderItem[] = params.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: Quantity.create(item.quantity),
      unitPrice: Money.create(item.unitPriceInCents),
    }));

    return new Order({
      id: params.id,
      orderNumber,
      tenantId: params.tenantId,
      siteId: params.siteId,
      supplierId: params.supplierId,
      items: orderItems,
      status: OrderStatus.DRAFT,
      deliveryDate: params.deliveryDate,
      notes: params.notes,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Factory pour réhydrater depuis la base de données
   */
  static rehydrate(props: OrderProps): Order {
    return new Order(props);
  }

  private static generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  // Getters
  get id(): number {
    return this.props.id;
  }

  get orderNumber(): string {
    return this.props.orderNumber;
  }

  get tenantId(): number {
    return this.props.tenantId;
  }

  get siteId(): number {
    return this.props.siteId;
  }

  get supplierId(): number {
    return this.props.supplierId;
  }

  get items(): readonly OrderItem[] {
    return this.props.items;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get deliveryDate(): Date {
    return this.props.deliveryDate;
  }

  get notes(): string | undefined {
    return this.props.notes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  /**
   * Calcule le montant total de la commande
   */
  get totalAmount(): Money {
    return this.items.reduce((total, item) => {
      const itemTotal = item.unitPrice.multiply(item.quantity.value);
      return total.add(itemTotal);
    }, Money.create(0));
  }

  /**
   * Méthode métier: Confirmer la commande
   */
  confirm(): Order {
    if (this.status !== OrderStatus.DRAFT && this.status !== OrderStatus.PENDING) {
      throw new Error('Cannot confirm order that is not in DRAFT or PENDING status');
    }

    return Order.rehydrate({
      ...this.props,
      status: OrderStatus.CONFIRMED,
      updatedAt: new Date(),
    });
  }

  /**
   * Méthode métier: Marquer comme livrée
   */
  markAsDelivered(): Order {
    if (this.status !== OrderStatus.CONFIRMED) {
      throw new Error('Cannot deliver order that is not confirmed');
    }

    return Order.rehydrate({
      ...this.props,
      status: OrderStatus.DELIVERED,
      updatedAt: new Date(),
    });
  }

  /**
   * Méthode métier: Annuler la commande
   */
  cancel(): Order {
    if (this.status === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel delivered order');
    }

    return Order.rehydrate({
      ...this.props,
      status: OrderStatus.CANCELLED,
      updatedAt: new Date(),
    });
  }

  /**
   * Égalité basée sur l'identité (ID)
   */
  equals(other: Order): boolean {
    return this.id === other.id;
  }
}
