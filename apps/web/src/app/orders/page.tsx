/**
 * Page Orders - Gestion des commandes fournisseurs
 * Démo avec données mock suivant l'architecture DDD
 */
import { Button } from '@optimus/ui';
import { OrderCard, type OrderCardProps } from '@/components/features/orders/OrderCard';

// Mock data - en production, ces données viendraient du backend via GraphQL
const mockOrders: OrderCardProps[] = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    supplierName: 'Metro Cash & Carry',
    totalAmount: '459,95 €',
    itemCount: 8,
    status: 'confirmed',
    deliveryDate: '10 nov. 2024',
    createdAt: '4 nov. 2024',
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    supplierName: 'Rungis Express',
    totalAmount: '189,50 €',
    itemCount: 5,
    status: 'pending',
    deliveryDate: '8 nov. 2024',
    createdAt: '4 nov. 2024',
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    supplierName: 'Transgourmet',
    totalAmount: '789,00 €',
    itemCount: 12,
    status: 'draft',
    deliveryDate: '12 nov. 2024',
    createdAt: '4 nov. 2024',
  },
  {
    id: 4,
    orderNumber: 'ORD-2024-004',
    supplierName: 'Metro Cash & Carry',
    totalAmount: '320,75 €',
    itemCount: 6,
    status: 'delivered',
    deliveryDate: '3 nov. 2024',
    createdAt: '1 nov. 2024',
  },
];

export default function OrdersPage(): JSX.Element {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-night-100">
              Commandes Fournisseurs
            </h1>
            <p className="text-lg text-night-50">
              Gérez vos commandes et suivez les livraisons
            </p>
          </div>
          <Button variant="primary" size="lg">
            + Nouvelle commande
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-sm text-night-50">Total en attente</p>
            <p className="text-2xl font-bold text-warning">1</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-sm text-night-50">Confirmées</p>
            <p className="text-2xl font-bold text-info">1</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-sm text-night-50">Livrées ce mois</p>
            <p className="text-2xl font-bold text-success">1</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-sm text-night-50">Brouillons</p>
            <p className="text-2xl font-bold text-night-100">1</p>
          </div>
        </div>

        {/* Order List */}
        <div className="grid gap-4 lg:grid-cols-2">
          {mockOrders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
              onView={(id) => console.log('View order:', id)}
              onConfirm={(id) => console.log('Confirm order:', id)}
              onCancel={(id) => console.log('Cancel order:', id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
