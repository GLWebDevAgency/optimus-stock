/**
 * Base class pour toutes les erreurs du domaine
 * Suit les principes DDD pour la gestion d'erreurs métier
 */

export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Erreur de validation du domaine
 */
export class DomainValidationError extends DomainError {
  constructor(message: string) {
    super(message, 'DOMAIN_VALIDATION_ERROR');
  }
}

/**
 * Erreur de règle métier
 */
export class BusinessRuleError extends DomainError {
  constructor(message: string, code: string) {
    super(message, code);
  }
}
