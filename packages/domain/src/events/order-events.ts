/**
 * Événements du domaine Order
 */
import { BaseDomainEvent } from './domain-event';

export interface OrderCreatedPayload {
  orderId: number;
  orderNumber: string;
  tenantId: number;
  supplierId: number;
  totalAmount: number;
  itemCount: number;
}

export class OrderCreatedEvent extends BaseDomainEvent {
  constructor(public readonly payload: OrderCreatedPayload) {
    super('OrderCreated');
  }
}

export interface OrderConfirmedPayload {
  orderId: number;
  orderNumber: string;
  confirmedAt: Date;
}

export class OrderConfirmedEvent extends BaseDomainEvent {
  constructor(public readonly payload: OrderConfirmedPayload) {
    super('OrderConfirmed');
  }
}

export interface OrderDeliveredPayload {
  orderId: number;
  orderNumber: string;
  deliveredAt: Date;
}

export class OrderDeliveredEvent extends BaseDomainEvent {
  constructor(public readonly payload: OrderDeliveredPayload) {
    super('OrderDelivered');
  }
}
