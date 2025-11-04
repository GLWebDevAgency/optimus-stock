/**
 * Page Suppliers - Gestion des fournisseurs
 */
import { Card, Badge, Button } from '@optimus/ui';

interface SupplierCardProps {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  isApproved: boolean;
  productsCount: number;
}

function SupplierCard({
  name,
  email,
  phone,
  isActive,
  isApproved,
  productsCount,
}: SupplierCardProps): JSX.Element {
  return (
    <Card variant="glass" padding="lg">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-night-100">{name}</h3>
            <p className="text-sm text-night-50">{productsCount} produits</p>
          </div>
          <div className="flex gap-2">
            {isApproved ? (
              <Badge variant="success">Approuvé</Badge>
            ) : (
              <Badge variant="warning">En attente</Badge>
            )}
            {isActive ? (
              <Badge variant="info">Actif</Badge>
            ) : (
              <Badge variant="error">Inactif</Badge>
            )}
          </div>
        </div>

        {/* Contact Info */}
        {(email || phone) && (
          <div className="space-y-1 text-sm">
            {email && (
              <div className="flex items-center gap-2">
                <span className="text-night-50">📧</span>
                <a
                  href={`mailto:${email}`}
                  className="text-oasis-200 hover:underline"
                >
                  {email}
                </a>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2">
                <span className="text-night-50">📞</span>
                <a
                  href={`tel:${phone}`}
                  className="text-oasis-200 hover:underline"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-sand-300">
          <Button variant="primary" size="sm" className="flex-1">
            Voir produits
          </Button>
          <Button variant="outline" size="sm">
            Modifier
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Mock data
const mockSuppliers: SupplierCardProps[] = [
  {
    id: 1,
    name: 'Metro Cash & Carry',
    email: 'contact@metro.fr',
    phone: '+33 1 23 45 67 89',
    isActive: true,
    isApproved: true,
    productsCount: 245,
  },
  {
    id: 2,
    name: 'Rungis Express',
    email: 'commandes@rungis-express.fr',
    phone: '+33 1 45 67 89 01',
    isActive: true,
    isApproved: true,
    productsCount: 189,
  },
  {
    id: 3,
    name: 'Transgourmet',
    email: 'service@transgourmet.fr',
    phone: '+33 1 56 78 90 12',
    isActive: true,
    isApproved: true,
    productsCount: 312,
  },
  {
    id: 4,
    name: 'Pomona',
    email: 'info@pomona.fr',
    isActive: true,
    isApproved: false,
    productsCount: 0,
  },
];

export default function SuppliersPage(): JSX.Element {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-night-100">
              Fournisseurs
            </h1>
            <p className="text-lg text-night-50">
              Gérez vos fournisseurs et leurs catalogues
            </p>
          </div>
          <Button variant="primary" size="lg">
            + Ajouter un fournisseur
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="elevated" padding="md">
            <p className="text-sm text-night-50">Total fournisseurs</p>
            <p className="text-3xl font-bold text-night-100">
              {mockSuppliers.length}
            </p>
          </Card>
          <Card variant="elevated" padding="md">
            <p className="text-sm text-night-50">Actifs</p>
            <p className="text-3xl font-bold text-success">
              {mockSuppliers.filter((s) => s.isActive).length}
            </p>
          </Card>
          <Card variant="elevated" padding="md">
            <p className="text-sm text-night-50">Approuvés</p>
            <p className="text-3xl font-bold text-info">
              {mockSuppliers.filter((s) => s.isApproved).length}
            </p>
          </Card>
          <Card variant="elevated" padding="md">
            <p className="text-sm text-night-50">Produits totaux</p>
            <p className="text-3xl font-bold text-night-100">
              {mockSuppliers.reduce((sum, s) => sum + s.productsCount, 0)}
            </p>
          </Card>
        </div>

        {/* Supplier List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockSuppliers.map((supplier) => (
            <SupplierCard key={supplier.id} {...supplier} />
          ))}
        </div>
      </div>
    </main>
  );
}
