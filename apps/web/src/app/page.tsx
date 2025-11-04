import { Button, Card, Badge } from '@optimus/ui';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-night-100">
            Optimus Stock
          </h1>
          <p className="mb-8 text-xl text-night-50">
            ERP SaaS multitenant de gestion de stock et commandes fournisseurs
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg">
              Commencer
            </Button>
            <Button variant="outline" size="lg">
              En savoir plus
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            Fonctionnalités Principales
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card variant="glass" padding="lg" hoverable>
              <div className="mb-4 text-4xl">📦</div>
              <h3 className="mb-2 text-xl font-semibold">Gestion de Stock</h3>
              <p className="text-night-50">
                Suivez votre inventaire en temps réel avec des alertes de stock bas
              </p>
            </Card>

            <Card variant="glass" padding="lg" hoverable>
              <div className="mb-4 text-4xl">🛒</div>
              <h3 className="mb-2 text-xl font-semibold">Commandes Rapides</h3>
              <p className="text-night-50">
                Créez des commandes en 2 clics ou à la voix
              </p>
            </Card>

            <Card variant="glass" padding="lg" hoverable>
              <div className="mb-4 text-4xl">🎤</div>
              <h3 className="mb-2 text-xl font-semibold">Assistant Vocal</h3>
              <p className="text-night-50">
                Passez commande et mettez à jour le stock à la voix
              </p>
            </Card>

            <Card variant="glass" padding="lg" hoverable>
              <div className="mb-4 text-4xl">📸</div>
              <h3 className="mb-2 text-xl font-semibold">OCR Factures</h3>
              <p className="text-night-50">
                Scannez vos factures pour créer automatiquement des commandes
              </p>
            </Card>

            <Card variant="glass" padding="lg" hoverable>
              <div className="mb-4 text-4xl">📊</div>
              <h3 className="mb-2 text-xl font-semibold">Analytics</h3>
              <p className="text-night-50">
                Tableaux de bord et rapports détaillés sur votre activité
              </p>
            </Card>

            <Card variant="glass" padding="lg" hoverable>
              <div className="mb-4 text-4xl">🌍</div>
              <h3 className="mb-2 text-xl font-semibold">Multilingue</h3>
              <p className="text-night-50">
                Interface disponible en français et arabe avec support RTL
              </p>
            </Card>
          </div>
        </section>

        {/* Status Badges */}
        <section className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            Architecture & Qualité
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="primary">Next.js 15</Badge>
            <Badge variant="primary">React 19 RC</Badge>
            <Badge variant="success">TypeScript Strict</Badge>
            <Badge variant="success">DDD/Hexagonal</Badge>
            <Badge variant="info">WCAG 2.2 AA</Badge>
            <Badge variant="warning">En Développement</Badge>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-r from-oasis-200 to-oasis-300 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Prêt à optimiser votre gestion de stock ?
          </h2>
          <p className="mb-8 text-lg">
            Rejoignez les restaurateurs qui font confiance à Optimus Stock
          </p>
          <Button variant="secondary" size="lg">
            Démarrer l&apos;essai gratuit
          </Button>
        </section>
      </div>
    </main>
  );
}
