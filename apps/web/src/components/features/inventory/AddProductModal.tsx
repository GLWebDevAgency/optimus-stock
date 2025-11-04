/**
 * AddProductModal - Modal pour ajouter un nouveau produit
 */
'use client';

import { useState } from 'react';
import { Modal, Input, Button } from '@optimus/ui';

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: {
    name: string;
    price: number;
    stock: number;
    unit: string;
  }) => void;
}

/**
 * Modal d'ajout de produit avec validation
 * 
 * @example
 * ```tsx
 * <AddProductModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onSave={handleSaveProduct}
 * />
 * ```
 */
export function AddProductModal({
  isOpen,
  onClose,
  onSave,
}: AddProductModalProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    unit: 'kg',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      newErrors.price = 'Prix invalide';
    }

    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      newErrors.stock = 'Stock invalide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Envoi des données
    onSave({
      name: formData.name.trim(),
      price,
      stock,
      unit: formData.unit,
    });

    // Reset form
    setFormData({ name: '', price: '', stock: '', unit: 'kg' });
    setErrors({});
    onClose();
  };

  const handleChange = (field: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter un produit"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du produit *"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          placeholder="Ex: Saumon Atlantique"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Prix unitaire (€) *"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            error={errors.price}
            placeholder="15.99"
          />

          <Input
            label="Stock initial *"
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            error={errors.stock}
            placeholder="50"
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="mb-2 block text-sm font-medium text-night-100"
          >
            Unité
          </label>
          <select
            id="unit"
            value={formData.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
            className="flex w-full rounded-lg border border-sand-300 bg-white px-3 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oasis-200 focus-visible:ring-offset-2"
          >
            <option value="kg">Kilogramme (kg)</option>
            <option value="L">Litre (L)</option>
            <option value="unité">Unité</option>
            <option value="g">Gramme (g)</option>
            <option value="mL">Millilitre (mL)</option>
          </select>
        </div>
      </form>
    </Modal>
  );
}
