/**
 * ProductCard Component - Affiche un produit avec son stock
 * Respecte les principes DDD: reçoit les données du domaine formatées
 */
'use client';

import { Card, Badge, Button } from '@optimus/ui';
import { memo } from 'react';

export interface ProductCardProps {
  id: number;
  name: string;
  price: string; // Déjà formaté (ex: "15,99 €")
  stock: number;
  unit: string;
  isLowStock: boolean;
  onAddToCart?: (productId: number) => void;
  onEdit?: (productId: number) => void;
}

/**
 * Carte produit pour l'affichage dans la liste d'inventaire
 * 
 * @example
 * ```tsx
 * <ProductCard
 *   id={1}
 *   name="Saumon Atlantique"
 *   price="15,99 €"
 *   stock={50}
 *   unit="kg"
 *   isLowStock={false}
 *   onAddToCart={handleAddToCart}
 * />
 * ```
 */
export const ProductCard = memo(function ProductCard({
  id,
  name,
  price,
  stock,
  unit,
  isLowStock,
  onAddToCart,
  onEdit,
}: ProductCardProps): JSX.Element {
  return (
    <Card
      variant="glass"
      padding="md"
      className="transition-transform hover:scale-[1.02]"
      role="article"
      aria-label={`Produit ${name}`}
    >
      <div className="flex flex-col gap-3">
        {/* Header avec nom et badge stock */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-night-100">{name}</h3>
            <p className="text-xl font-bold text-oasis-200">{price}</p>
          </div>
          {isLowStock && (
            <Badge variant="warning" className="ml-2">
              Stock bas
            </Badge>
          )}
        </div>

        {/* Stock info */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-night-50">En stock:</span>
          <span
            className={`text-base font-semibold ${
              isLowStock ? 'text-warning' : 'text-night-100'
            }`}
          >
            {stock} {unit}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAddToCart(id)}
              className="flex-1"
              aria-label={`Ajouter ${name} au panier`}
            >
              Ajouter au panier
            </Button>
          )}
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(id)}
              aria-label={`Modifier ${name}`}
            >
              Modifier
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
});
