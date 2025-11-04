# Optimus Stock

**ERP SaaS multitenant de gestion de stock et commandes fournisseurs pour la restauration**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19_RC-blue.svg)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🎯 Vision

Optimus Stock vise à être la solution la plus rapide, intuitive et accessible du marché pour la gestion de stock en restauration, surpassant Yokitup, Metro Marketplace et les ERP généralistes.

### Cible

- Restaurateurs
- Traiteurs
- Cuisines centrales
- Magasins de bouche

### Expérience Unique

- ✅ Commandes en 2 clics ou à la voix
- ✅ UX sans friction, sans formation nécessaire
- ✅ Usage terrain (mobile en cuisine, saisie rapide, OCR, assistant vocal)
- ✅ Administration visuelle web (ERP, analytics, gestion fournisseurs)

## 🏗️ Architecture

### Architecture Hexagonale/DDD

Le projet suit strictement les principes de Domain-Driven Design (DDD) et d'architecture hexagonale:

```
src/
├── domain/                    # Règles métier pures (zéro dépendance framework)
│   ├── entities/              # Product, Order, Supplier
│   ├── value-objects/         # Money, Quantity, ProductId
│   ├── events/                # OrderCreatedEvent, StockUpdatedEvent
│   └── exceptions/            # DomainValidationError, BusinessRuleError
│
├── application/               # Orchestration business logic
│   ├── use-cases/             # CreateOrderUseCase, UpdateInventoryUseCase
│   ├── ports/                 # Interfaces pour repositories, services externes
│   └── dto/                   # Commands (inputs) et Results (outputs)
│
├── infrastructure/            # Adapters, implémentations concrètes
│   ├── repositories/          # Apollo Client adapters pour GraphQL BFF
│   ├── services/              # Implémentations services externes
│   └── mappers/               # GraphQL ↔ Domain entities
│
└── ui/                        # Présentation (components React)
    ├── features/              # Features par bounded context
    ├── shared/                # Composants réutilisables
    └── app/                   # Next.js App Router ou Expo Router
```

### Principes Clés

1. **Domain Purity**: Couche domaine sans dépendances externes
2. **Dependency Inversion**: Use Cases dépendent d'interfaces, pas d'implémentations
3. **Immutability**: Value Objects et Entities immutables
4. **Type Safety**: TypeScript strict mode, zéro `any`

## 🎨 Design System

### Palette "Art Islamique & Désert"

- **Sand** (Sable doux): Backgrounds, surfaces larges
- **Night** (Ciel nocturne): Contenus riches, contraste fort
- **Oasis** (Vert oasis): Actions primaires, CTA
- **Gold** (Or calligraphique): Highlights, typographie sacrée

### Glassmorphism

Effet verre dépoli avec transparence et flou pour un design moderne et élégant.

## 🛠️ Stack Technique

### Web (Next.js 15+)

- **Framework**: Next.js 15 avec App Router et React Server Components
- **React**: 19 RC
- **TypeScript**: 5.3 en mode strict
- **Styling**: Tailwind CSS 3.4
- **State**: Zustand pour client state
- **Validation**: Zod pour runtime validation
- **Components**: class-variance-authority pour variants

### Mobile (Expo SDK 54+) - À venir

- **Framework**: Expo 54 avec Expo Router
- **React Native**: 0.76
- **Styling**: NativeWind (Tailwind pour React Native)
- **Voice**: expo-speech pour reconnaissance vocale
- **Camera**: expo-camera pour OCR

## 📦 Structure du Monorepo

```
optimus-stock/
├── apps/
│   ├── web/                   # Application Next.js (ERP Admin)
│   └── mobile/                # Application Expo (Terrain)
│
├── packages/
│   ├── ui/                    # Design System (composants partagés)
│   ├── domain/                # Domain Layer (entities, value objects)
│   └── application/           # Application Layer (use cases)
│
├── pnpm-workspace.yaml        # Configuration pnpm workspaces
└── package.json               # Scripts racine
```

## 🚀 Getting Started

### Prérequis

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Cloner le repository
git clone https://github.com/GLWebDevAgency/optimus-stock.git
cd optimus-stock

# Installer les dépendances
pnpm install

# Démarrer l'app web en développement
pnpm dev:web

# Démarrer l'app mobile en développement (à venir)
pnpm dev:mobile
```

### Scripts Disponibles

```bash
# Développement
pnpm dev:web          # Démarrer Next.js
pnpm dev:mobile       # Démarrer Expo

# Build
pnpm build:web        # Build Next.js
pnpm build:mobile     # Build Expo

# Tests
pnpm test             # Lancer tous les tests
pnpm test:coverage    # Tests avec coverage

# Qualité
pnpm lint             # Linter tout le code
pnpm type-check       # Vérifier les types TypeScript
pnpm format           # Formater avec Prettier
```

## 🎯 Fonctionnalités Principales

### ✅ Implémentées

- Design System avec tokens et composants atomiques
- Architecture DDD/Hexagonale
- Entités domaine (Product, Order)
- Value Objects (Money, Quantity, ProductName)
- Domain Events
- Page d'accueil Next.js avec glassmorphism

### 🚧 En Développement

- Application Layer (Use Cases, Ports)
- Infrastructure Layer (Repositories, Services)
- Features UI (Inventory, Orders, Dashboard)
- Assistant Vocal
- OCR Factures
- Authentification et autorisation
- Multi-tenancy
- Internationalisation (FR/AR)

### 📋 Planifiées

- Analytics et reporting
- Deep Search multi-fournisseurs
- Gestion fournisseurs
- Mode hors-ligne (mobile)
- Notifications push
- Export de données

## 📊 Qualité & Performance

### Objectifs

- **Performance**: Lighthouse Score ≥ 90
- **Accessibilité**: WCAG 2.2 AA, Lighthouse ≥ 95
- **TypeScript**: Strict mode, 0 `any`, 0 `@ts-ignore`
- **Tests**: Coverage ≥ 80% (domain + application)
- **Bundle**: < 200KB initial (gzipped)

### Core Web Vitals Cibles

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🌍 Internationalisation

Support multilingue avec RTL pour l'arabe:

- 🇫🇷 Français (par défaut)
- 🇸🇦 Arabe (avec support RTL)

## 🔐 Sécurité

- Validation stricte avec Zod
- TypeScript strict mode
- Content Security Policy
- CSRF protection
- XSS prevention
- Secure token storage

## 📖 Documentation

- [Architecture détaillée](./frontend_ai_prompt.md) - Spécifications complètes
- [Design System](./packages/ui/README.md) - Guide des composants
- [Domain Layer](./packages/domain/README.md) - Entités et règles métier

## 🤝 Contribution

Ce projet suit les standards de code les plus élevés:

- Conventional Commits
- TypeScript strict mode
- Tests obligatoires
- Code review avant merge
- Documentation JSDoc

## 📝 License

MIT License - voir [LICENSE](LICENSE)

## 👥 Équipe

Développé par [GL Web Dev Agency](https://github.com/GLWebDevAgency)

---

**Note**: Ce projet est en développement actif. Les fonctionnalités sont ajoutées progressivement selon les principes d'architecture world-class et de craft quality.
