# Architecture Optimus Stock

## Vue d'ensemble

Optimus Stock suit une **architecture hexagonale/DDD** stricte avec séparation claire des responsabilités.

## Principes Architecturaux

### 1. Domain-Driven Design (DDD)

Le domaine métier est au cœur de l'architecture:

- **Domain Layer**: Entités, Value Objects, Events - **AUCUNE** dépendance externe
- **Application Layer**: Use Cases qui orchestrent le domaine
- **Infrastructure Layer**: Adapters pour services externes (GraphQL, Camera, Voice)
- **Presentation Layer (UI)**: Components React qui affichent les données

### 2. Dependency Inversion

```
UI Layer → Application Layer → Domain Layer
            ↓
Infrastructure Layer (implémente les ports)
```

Les couches supérieures dépendent des abstractions (interfaces/ports), pas des implémentations.

### 3. Immutability

Tous les objets du domaine sont **immutables**:

```typescript
const product = Product.create({ ... });
// product.stock = ... ❌ Impossible

const updated = product.restockInventory(Quantity.create(10)); // ✅ Nouveau objet
```

## Structure des Packages

```
optimus-stock/
├── packages/
│   ├── ui/              # Design System (composants réutilisables)
│   ├── domain/          # Domain Layer (entités, value objects)
│   └── application/     # Application Layer (use cases) [À venir]
│
└── apps/
    ├── web/            # Next.js 15 - ERP Admin
    └── mobile/         # Expo 54 - Terrain App [À venir]
```

## Couche Domain (@optimus/domain)

### Entities

Les entités ont une **identité** (ID) et représentent des concepts métier:

- `Product`: Produit avec logique stock
- `Order`: Commande fournisseur avec workflow

**Règles**:
- ✅ Immutables (Object.freeze)
- ✅ Factory methods (`create`, `rehydrate`)
- ✅ Méthodes métier uniquement
- ❌ Pas de dépendances externes

### Value Objects

Les value objects sont **sans identité** et comparés par valeur:

- `Money`: Montant monétaire avec arithmétique sécurisée
- `Quantity`: Quantité de produit
- `ProductName`: Nom de produit validé

**Règles**:
- ✅ Immutables
- ✅ Égalité par valeur
- ✅ Validation stricte
- ❌ Pas d'ID

### Domain Events

Événements métier pour Event Sourcing et notifications:

- `OrderCreatedEvent`
- `StockUpdatedEvent`
- `LowStockAlertEvent`

### Exceptions

Erreurs typées pour gestion d'erreurs précise:

- `DomainError`: Base class
- `InvalidQuantityError`, `OutOfStockError`, etc.

## Couche Application (À venir)

### Use Cases

Orchestrent la logique métier via les entités et ports:

```typescript
class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {}
  
  async execute(command: CreateOrderCommand): Promise<CreateOrderResult> {
    // 1. Valider les données
    // 2. Créer l'entité Order
    // 3. Persister via repository
    // 4. Publier event
  }
}
```

### Ports (Interfaces)

Abstractions pour dépendances externes:

- `ProductRepository`: Interface pour persistance produits
- `VoiceService`: Interface pour reconnaissance vocale
- `AnalyticsService`: Interface pour analytics

### DTOs

- **Commands**: Inputs (ex: `CreateOrderCommand`)
- **Results**: Outputs (ex: `CreateOrderResult`)

## Couche Infrastructure (À venir)

### Adapters

Implémentations concrètes des ports:

- `GraphQLProductRepository`: Apollo Client pour produits
- `ExpoVoiceService`: expo-speech pour reconnaissance vocale
- `CameraOCRService`: expo-camera + OCR

### Mappers

Conversions GraphQL ↔ Domain:

```typescript
class ProductMapper {
  static toDomain(graphqlProduct): Product { ... }
  static toGraphQL(product: Product): GraphQLInput { ... }
}
```

## Couche UI

### Structure

```
apps/web/src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── dashboard/         # Dashboard route
│   ├── inventory/         # Inventory route
│   └── orders/            # Orders route
│
├── components/
│   ├── Navigation.tsx     # Nav globale
│   └── features/          # Features par domaine
│       ├── inventory/     # ProductCard, ProductList
│       └── orders/        # OrderCard, etc.
│
└── lib/                   # Utilities
```

### Principes UI

1. **Component Purity**: Props in, JSX out
2. **Zero Business Logic**: Délégué aux use cases
3. **Accessibility**: WCAG 2.2 AA
4. **Performance**: Memoization, code splitting

### Data Flow

```
User Action → Component → Hook → Use Case → Repository → Backend
                ↓
            UI Update (via state)
```

## Design System (@optimus/ui)

### Tokens

- **Colors**: Palette désert (sand, night, oasis, gold)
- **Typography**: Inter (latin), Amiri (arabe)
- **Spacing**: 4px scale
- **Shadows**: Glassmorphism

### Components

Atomic components avec variants:

- `Button`: primary, secondary, outline, ghost, danger
- `Card`: default, glass, elevated, outlined
- `Badge`: status indicators
- `Input`: avec validation

### Glassmorphism

Effet verre dépoli signature:

```css
.glass-card {
  background: rgba(245, 231, 198, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 163, 55, 0.2);
  box-shadow: 0 8px 32px 0 rgba(27, 58, 75, 0.15);
}
```

## Flows Métier Critiques

### 1. Création de Commande

```
UI: OrderForm
  ↓
Use Case: CreateOrderUseCase
  ↓ validate stock
Product Repository → Backend
  ↓
Order.create() → Order entity
  ↓
Order Repository → Backend (save)
  ↓
Event Bus → OrderCreatedEvent
  ↓
UI: Success notification
```

### 2. Mise à Jour Stock

```
UI: ProductCard (edit)
  ↓
Use Case: UpdateStockUseCase
  ↓
Product.restockInventory() → New Product
  ↓
Product Repository → Backend
  ↓
Event Bus → StockUpdatedEvent
  ↓
UI: Stock updated
```

### 3. Assistant Vocal (Mobile - À venir)

```
UI: Voice button pressed
  ↓
Voice Service: Record & transcribe
  ↓
NLP Service: Parse intent
  ↓
Use Case: Process command
  ↓
Execute action
  ↓
UI: Voice feedback
```

## Qualité & Testing

### TypeScript Strict

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitReturns": true,
  "noUnusedLocals": true,
  // ... plus de règles strictes
}
```

**Interdictions absolues**:
- ❌ `any`
- ❌ `@ts-ignore`
- ❌ `as` assertions (sauf cas justifiés)
- ❌ `!` non-null assertion

### Strategy de Tests

```
Domain Layer: 80%+ coverage
  - Unit tests (Vitest)
  - Entities + Value Objects

Application Layer: 70%+ coverage
  - Integration tests
  - Use Cases

UI Layer: 60%+ coverage
  - Component tests (Testing Library)
  - E2E tests (Playwright/Detox)
```

### Accessibilité

**WCAG 2.2 AA** obligatoire:

- ✅ Contraste 4.5:1 minimum
- ✅ Navigation clavier complète
- ✅ Focus visible
- ✅ ARIA labels
- ✅ Semantic HTML

## Performance

### Objectifs

- Lighthouse Performance: ≥ 90
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### Techniques

- React.memo() pour composants lourds
- useMemo/useCallback appropriés
- Code splitting avec React.lazy()
- Image optimization (next/image)
- Font optimization (next/font)

## Internationalisation

### Langues Supportées

- 🇫🇷 Français (par défaut)
- 🇸🇦 Arabe (avec RTL)

### Implementation

```typescript
import { useIntl } from '@formatjs/intl';

function MyComponent() {
  const intl = useIntl();
  return <p>{intl.formatMessage({ id: 'product.add' })}</p>;
}
```

### RTL Support

CSS logical properties:

```css
/* ❌ margin-left: 1rem; */
/* ✅ */ margin-inline-start: 1rem;
```

## Sécurité

### Frontend

- Validation Zod sur tous les inputs
- XSS prevention (React auto-escape)
- CSRF tokens pour mutations
- Secure token storage

### Authentication

```
User → Login → BFF
         ↓
    JWT Token (access)
    HttpOnly Cookie (refresh)
         ↓
    Frontend stores access token
         ↓
    Auto-refresh avant expiration
```

## Patterns & Best Practices

### Clean Code

1. **Nommage explicite**: `getUserOrders` pas `getData`
2. **Fonctions courtes**: < 20 lignes idéalement
3. **Single Responsibility**: 1 fonction = 1 tâche
4. **Pas de side effects**: Préférer fonctions pures

### React

1. **Props drilling**: Max 2 niveaux, sinon Context
2. **State locality**: State au plus près du besoin
3. **Custom hooks**: Extraire logique réutilisable
4. **Composition**: Préférer à l'héritage

### DDD

1. **Domain purity**: Zéro framework dans domain/
2. **Ubiquitous language**: Même vocabulaire partout
3. **Bounded contexts**: Séparation claire des domaines
4. **Aggregate roots**: Product, Order sont des aggregates

## Évolution Future

### Phase 1 (Actuel)
- ✅ Design System
- ✅ Domain Layer
- ✅ Pages Web de base

### Phase 2
- [ ] Application Layer (Use Cases)
- [ ] Infrastructure Layer (Repositories)
- [ ] State management (Zustand)

### Phase 3
- [ ] Mobile App (Expo)
- [ ] Voice Assistant
- [ ] OCR Scanning

### Phase 4
- [ ] Authentification complète
- [ ] Multi-tenancy
- [ ] Analytics avancés

### Phase 5
- [ ] Mode hors-ligne
- [ ] Notifications push
- [ ] Export/Import données

## Références

- [DDD by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
