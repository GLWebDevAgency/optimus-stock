/**
 * Page Dashboard - Vue d'ensemble avec analytics
 */
import { Card, Badge, Button } from '@optimus/ui';

export default function DashboardPage(): JSX.Element {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-night-100">
            Tableau de Bord
          </h1>
          <p className="text-lg text-night-50">
            Vue d&apos;ensemble de votre activité
          </p>
        </div>

        {/* KPIs */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="glass" padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm text-night-50">CA du mois</p>
                <p className="text-3xl font-bold text-oasis-200">15 890 €</p>
                <p className="mt-2 text-sm text-success">+12% vs mois dernier</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </Card>

          <Card variant="glass" padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm text-night-50">Commandes actives</p>
                <p className="text-3xl font-bold text-night-100">24</p>
                <p className="mt-2 text-sm text-info">8 en attente</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </Card>

          <Card variant="glass" padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm text-night-50">Produits en stock</p>
                <p className="text-3xl font-bold text-night-100">342</p>
                <p className="mt-2 text-sm text-warning">12 en stock bas</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </Card>

          <Card variant="glass" padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm text-night-50">Fournisseurs actifs</p>
                <p className="text-3xl font-bold text-night-100">8</p>
                <p className="mt-2 text-sm text-night-50">Sur 12 total</p>
              </div>
              <div className="text-3xl">🤝</div>
            </div>
          </Card>
        </div>

        {/* Alertes et Actions Rapides */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Alertes Stock Bas */}
          <Card variant="glass" padding="lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-night-100">
                ⚠️ Alertes Stock Bas
              </h2>
              <Badge variant="warning">12</Badge>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Farine T45', stock: 5, unit: 'kg' },
                { name: 'Poulet Fermier Bio', stock: 8, unit: 'kg' },
                { name: 'Beurre Doux', stock: 7, unit: 'kg' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-warning/10 p-3"
                >
                  <div>
                    <p className="font-medium text-night-100">{item.name}</p>
                    <p className="text-sm text-night-50">
                      Reste: {item.stock} {item.unit}
                    </p>
                  </div>
                  <Button variant="primary" size="sm">
                    Commander
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Commandes Récentes */}
          <Card variant="glass" padding="lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-night-100">
                📦 Commandes Récentes
              </h2>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
            <div className="space-y-3">
              {[
                {
                  number: 'ORD-2024-001',
                  supplier: 'Metro',
                  amount: '459,95 €',
                  status: 'confirmed',
                },
                {
                  number: 'ORD-2024-002',
                  supplier: 'Rungis',
                  amount: '189,50 €',
                  status: 'pending',
                },
                {
                  number: 'ORD-2024-003',
                  supplier: 'Transgourmet',
                  amount: '789,00 €',
                  status: 'draft',
                },
              ].map((order, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-sand-100 p-3"
                >
                  <div>
                    <p className="font-medium text-night-100">{order.number}</p>
                    <p className="text-sm text-night-50">{order.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-oasis-200">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === 'confirmed'
                          ? 'info'
                          : order.status === 'pending'
                            ? 'warning'
                            : 'default'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Actions Rapides */}
        <Card variant="glass" padding="lg">
          <h2 className="mb-4 text-xl font-semibold text-night-100">
            🚀 Actions Rapides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="primary" size="lg" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">➕</span>
                <span>Nouvelle Commande</span>
              </div>
            </Button>
            <Button variant="secondary" size="lg" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📦</span>
                <span>Ajouter Produit</span>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📸</span>
                <span>Scanner Facture</span>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>Voir Rapports</span>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
