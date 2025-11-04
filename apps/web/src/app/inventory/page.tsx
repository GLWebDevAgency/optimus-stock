/**
 * Page Inventory - Gestion du stock
 * Démo avec données mock suivant l'architecture DDD
 */
import { Button } from '@optimus/ui';
import { ProductList } from '@/components/features/inventory/ProductList';
import type { ProductCardProps } from '@/components/features/inventory/ProductCard';

// Mock data - en production, ces données viendraient du backend via GraphQL
const mockProducts: ProductCardProps[] = [
  {
    id: 1,
    name: 'Saumon Atlantique',
    price: '15,99 €',
    stock: 50,
    unit: 'kg',
    isLowStock: false,
  },
  {
    id: 2,
    name: 'Poulet Fermier Bio',
    price: '8,50 €',
    stock: 8,
    unit: 'kg',
    isLowStock: true,
  },
  {
    id: 3,
    name: 'Tomates Cœur de Bœuf',
    price: '3,99 €',
    stock: 25,
    unit: 'kg',
    isLowStock: false,
  },
  {
    id: 4,
    name: 'Huile d\'Olive Extra Vierge',
    price: '12,90 €',
    stock: 15,
    unit: 'L',
    isLowStock: false,
  },
  {
    id: 5,
    name: 'Farine T45',
    price: '1,20 €',
    stock: 5,
    unit: 'kg',
    isLowStock: true,
  },
  {
    id: 6,
    name: 'Riz Basmati',
    price: '2,50 €',
    stock: 100,
    unit: 'kg',
    isLowStock: false,
  },
  {
    id: 7,
    name: 'Fromage Comté AOP',
    price: '18,90 €',
    stock: 12,
    unit: 'kg',
    isLowStock: false,
  },
  {
    id: 8,
    name: 'Beurre Doux',
    price: '4,50 €',
    stock: 7,
    unit: 'kg',
    isLowStock: true,
  },
];

export default function InventoryPage(): JSX.Element {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-night-100">
              Inventaire
            </h1>
            <p className="text-lg text-night-50">
              Gérez votre stock et vos produits
            </p>
          </div>
          <Button variant="primary" size="lg">
            + Ajouter un produit
          </Button>
        </div>

        {/* Product List */}
        <ProductList
          products={mockProducts}
          onAddToCart={(id) => console.log('Add to cart:', id)}
          onEdit={(id) => console.log('Edit product:', id)}
        />
      </div>
    </main>
  );
}
