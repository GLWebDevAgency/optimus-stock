# @optimus/domain

Domain Layer pour Optimus Stock - Entités, Value Objects, Events et Exceptions suivant les principes DDD.

## Principes DDD

Cette couche respecte strictement:

- ✅ **Domain Purity**: Aucune dépendance framework (React, Next.js, Apollo, etc.)
- ✅ **Immutability**: Tous les objets sont immutables (Object.freeze)
- ✅ **Validation**: Invariants validés à la création
- ✅ **Type Safety**: TypeScript strict mode

## Entities

### Product

Entité représentant un produit avec logique métier.

```typescript
import { Product, Money, Quantity, ProductName } from '@optimus/domain';

// Créer un nouveau produit
const product = Product.create({
  id: 1,
  name: 'Saumon Atlantique',
  priceInCents: 1500, // 15.00€
  stock: 50,
  unit: 'kg',
});

// Méthodes métier
const canFulfill = product.canFulfillOrder(Quantity.create(5));
const updated = product.reserveStock(Quantity.create(5));
const restocked = product.restockInventory(Quantity.create(10));
const isLow = product.isLowStock(10); // threshold 10
```

### Order

Entité représentant une commande fournisseur.

```typescript
import { Order, OrderStatus } from '@optimus/domain';

const order = Order.create({
  id: 1,
  tenantId: 1,
  siteId: 1,
  supplierId: 42,
  items: [
    {
      productId: 10,
      productName: 'Saumon Atlantique',
      quantity: 5,
      unitPriceInCents: 1500,
    },
  ],
  deliveryDate: new Date('2025-11-10'),
  notes: 'Livraison matin',
});

// Méthodes métier
const confirmed = order.confirm();
const delivered = order.markAsDelivered();
const total = order.totalAmount; // Money object
```

## Value Objects

### Money

Représente une valeur monétaire avec arithmétique sécurisée.

```typescript
import { Money } from '@optimus/domain';

const price = Money.fromFloat(15.99, 'EUR');
const total = price.multiply(5); // 79.95€

price.toFloat(); // 15.99
price.cents; // 1599
price.currency; // 'EUR'
price.format('fr-FR'); // '15,99 €'

const sum = price.add(Money.fromFloat(10, 'EUR')); // 25.99€
```

### Quantity

Représente une quantité de produit.

```typescript
import { Quantity } from '@optimus/domain';

const stock = Quantity.create(50);
const requested = Quantity.create(5);

stock.isSufficientFor(requested); // true
stock.isLowStock(10); // false

const remaining = stock.subtract(requested); // 45
const added = stock.add(Quantity.create(20)); // 70
```

### ProductName

Représente le nom d'un produit avec validation.

```typescript
import { ProductName } from '@optimus/domain';

const name = ProductName.create('Saumon Atlantique');
name.value; // 'Saumon Atlantique'

// Validation
ProductName.create(''); // throw InvalidProductNameError
ProductName.create(' '.repeat(300)); // throw InvalidProductNameError
```

## Events

### Domain Events

Événements métier pour event sourcing et notifications.

```typescript
import {
  OrderCreatedEvent,
  StockUpdatedEvent,
  LowStockAlertEvent,
} from '@optimus/domain';

const event = new OrderCreatedEvent({
  orderId: 1,
  orderNumber: 'ORD-123',
  tenantId: 1,
  supplierId: 42,
  totalAmount: 79.95,
  itemCount: 1,
});

event.eventId; // UUID auto-généré
event.occurredAt; // Date de création
event.eventType; // 'OrderCreated'
```

## Exceptions

### Domain Errors

Erreurs métier typées pour gestion d'erreurs précise.

```typescript
import {
  InvalidQuantityError,
  InvalidPriceError,
  OutOfStockError,
} from '@optimus/domain';

try {
  const quantity = Quantity.create(-5);
} catch (error) {
  if (error instanceof InvalidQuantityError) {
    console.log(error.code); // 'DOMAIN_VALIDATION_ERROR'
  }
}

try {
  product.reserveStock(Quantity.create(100));
} catch (error) {
  if (error instanceof OutOfStockError) {
    console.log(error.code); // 'OUT_OF_STOCK'
    console.log(error.requested); // 100
    console.log(error.available); // 50
  }
}
```

## Tests

Tous les objets du domaine sont testables en isolation:

```typescript
import { describe, it, expect } from 'vitest';
import { Product, Money, Quantity } from '@optimus/domain';

describe('Product Entity', () => {
  it('should reserve stock correctly', () => {
    const product = Product.create({
      id: 1,
      name: 'Test',
      priceInCents: 1000,
      stock: 50,
    });

    const updated = product.reserveStock(Quantity.create(5));

    expect(updated.stock.value).toBe(45);
  });
});
```

## Immutability

Tous les objets sont immutables:

```typescript
const product = Product.create({ ... });
product.stock = Quantity.create(100); // ❌ TypeError

const updated = product.restockInventory(Quantity.create(50)); // ✅ Nouveau objet
```

## License

MIT
