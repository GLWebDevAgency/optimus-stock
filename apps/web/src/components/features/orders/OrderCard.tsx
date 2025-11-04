/**
 * OrderCard Component - Affiche une commande avec son statut
 */
'use client';

import { Card, Badge, Button } from '@optimus/ui';
import { memo } from 'react';

export interface OrderCardProps {
  id: number;
  orderNumber: string;
  supplierName: string;
  totalAmount: string; // Formaté (ex: "159,95 €")
  itemCount: number;
  status: 'draft' | 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  deliveryDate: string; // Formaté (ex: "10 nov. 2025")
  createdAt: string; // Formaté (ex: "4 nov. 2024")
  onView?: (orderId: number) => void;
  onConfirm?: (orderId: number) => void;
  onCancel?: (orderId: number) => void;
}

const statusConfig = {
  draft: { label: 'Brouillon', variant: 'default' as const },
  pending: { label: 'En attente', variant: 'warning' as const },
  confirmed: { label: 'Confirmée', variant: 'info' as const },
  delivered: { label: 'Livrée', variant: 'success' as const },
  cancelled: { label: 'Annulée', variant: 'error' as const },
};

/**
 * Carte commande pour l'affichage dans la liste des commandes
 * 
 * @example
 * ```tsx
 * <OrderCard
 *   id={1}
 *   orderNumber="ORD-123"
 *   supplierName="Metro Cash & Carry"
 *   totalAmount="159,95 €"
 *   itemCount={3}
 *   status="confirmed"
 *   deliveryDate="10 nov. 2025"
 *   createdAt="4 nov. 2024"
 *   onView={handleView}
 * />
 * ```
 */
export const OrderCard = memo(function OrderCard({
  id,
  orderNumber,
  supplierName,
  totalAmount,
  itemCount,
  status,
  deliveryDate,
  createdAt,
  onView,
  onConfirm,
  onCancel,
}: OrderCardProps): JSX.Element {
  const statusInfo = statusConfig[status];

  return (
    <Card
      variant="glass"
      padding="md"
      className="transition-transform hover:scale-[1.01]"
      role="article"
      aria-label={`Commande ${orderNumber}`}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-night-100">
              {orderNumber}
            </h3>
            <p className="text-sm text-night-50">{supplierName}</p>
          </div>
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        </div>

        {/* Montant et items */}
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-oasis-200">
            {totalAmount}
          </span>
          <span className="text-sm text-night-50">
            {itemCount} article{itemCount > 1 ? 's' : ''}
          </span>
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-1 text-sm text-night-50">
          <div className="flex items-center gap-2">
            <span>📅 Livraison:</span>
            <span className="font-medium text-night-100">{deliveryDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Créée le:</span>
            <span>{createdAt}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-sand-300">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(id)}
              className="flex-1"
              aria-label={`Voir détails commande ${orderNumber}`}
            >
              Voir détails
            </Button>
          )}
          {status === 'draft' && onConfirm && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConfirm(id)}
              aria-label={`Confirmer commande ${orderNumber}`}
            >
              Confirmer
            </Button>
          )}
          {(status === 'draft' || status === 'pending') && onCancel && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancel(id)}
              aria-label={`Annuler commande ${orderNumber}`}
            >
              Annuler
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
});
