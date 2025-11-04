/**
 * Base pour les événements du domaine
 */

export interface DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly eventType: string;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly eventType: string;

  constructor(eventType: string) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
    this.eventType = eventType;
  }
}
