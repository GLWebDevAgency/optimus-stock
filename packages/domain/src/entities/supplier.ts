/**
 * Entity Supplier - Entité domaine représentant un fournisseur
 */

export interface SupplierProps {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entité Supplier du domaine
 */
export class Supplier {
  private constructor(private readonly props: SupplierProps) {
    Object.freeze(this);
  }

  /**
   * Factory pour créer un nouveau fournisseur
   */
  static create(params: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  }): Supplier {
    const now = new Date();

    return new Supplier({
      id: params.id,
      name: params.name,
      email: params.email,
      phone: params.phone,
      address: params.address,
      isActive: true,
      isApproved: false, // Nécessite approbation par défaut
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Factory pour réhydrater depuis la base de données
   */
  static rehydrate(props: SupplierProps): Supplier {
    return new Supplier(props);
  }

  // Getters
  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  get address(): string | undefined {
    return this.props.address;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get isApproved(): boolean {
    return this.props.isApproved;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  /**
   * Méthode métier: Approuver le fournisseur
   */
  approve(): Supplier {
    return Supplier.rehydrate({
      ...this.props,
      isApproved: true,
      updatedAt: new Date(),
    });
  }

  /**
   * Méthode métier: Désactiver le fournisseur
   */
  deactivate(): Supplier {
    return Supplier.rehydrate({
      ...this.props,
      isActive: false,
      updatedAt: new Date(),
    });
  }

  /**
   * Méthode métier: Réactiver le fournisseur
   */
  reactivate(): Supplier {
    return Supplier.rehydrate({
      ...this.props,
      isActive: true,
      updatedAt: new Date(),
    });
  }

  /**
   * Vérifie si le fournisseur peut recevoir des commandes
   */
  canReceiveOrders(): boolean {
    return this.isActive && this.isApproved;
  }

  /**
   * Égalité basée sur l'identité (ID)
   */
  equals(other: Supplier): boolean {
    return this.id === other.id;
  }
}
