/**
 * ProductList Component - Liste de produits avec recherche et filtres
 */
'use client';

import { ProductCard, type ProductCardProps } from './ProductCard';
import { Input } from '@optimus/ui';
import { useState, useMemo } from 'react';

export interface ProductListProps {
  products: ProductCardProps[];
  onAddToCart?: (productId: number) => void;
  onEdit?: (productId: number) => void;
}

/**
 * Liste de produits avec fonctionnalités de recherche
 * 
 * @example
 * ```tsx
 * <ProductList
 *   products={products}
 *   onAddToCart={handleAddToCart}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function ProductList({
  products,
  onAddToCart,
  onEdit,
}: ProductListProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des produits par recherche
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="sticky top-0 z-10 bg-sand-50/80 backdrop-blur-sm pb-4">
        <Input
          type="search"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Rechercher un produit"
        />
      </div>

      {/* Statistiques */}
      <div className="flex gap-4 text-sm text-night-50">
        <span>
          <strong className="text-night-100">{filteredProducts.length}</strong>{' '}
          produit(s)
        </span>
        <span>•</span>
        <span>
          <strong className="text-night-100">
            {products.filter((p) => p.isLowStock).length}
          </strong>{' '}
          en stock bas
        </span>
      </div>

      {/* Liste de produits */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-night-50">
            Aucun produit trouvé pour &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
