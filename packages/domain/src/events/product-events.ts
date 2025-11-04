/**
 * Événements du domaine Product
 */
import { BaseDomainEvent } from './domain-event';

export interface StockUpdatedPayload {
  productId: number;
  previousStock: number;
  newStock: number;
  changeAmount: number;
}

export class StockUpdatedEvent extends BaseDomainEvent {
  constructor(public readonly payload: StockUpdatedPayload) {
    super('StockUpdated');
  }
}

export interface ProductCreatedPayload {
  productId: number;
  productName: string;
  price: number;
  initialStock: number;
}

export class ProductCreatedEvent extends BaseDomainEvent {
  constructor(public readonly payload: ProductCreatedPayload) {
    super('ProductCreated');
  }
}

export interface LowStockAlertPayload {
  productId: number;
  productName: string;
  currentStock: number;
  threshold: number;
}

export class LowStockAlertEvent extends BaseDomainEvent {
  constructor(public readonly payload: LowStockAlertPayload) {
    super('LowStockAlert');
  }
}
