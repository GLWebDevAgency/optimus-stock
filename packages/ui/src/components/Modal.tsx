/**
 * Composant Modal - Dialog accessible
 * Respecte WCAG 2.2 AA avec gestion focus et clavier
 */
'use client';

import { forwardRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * État d'ouverture du modal
   */
  isOpen: boolean;
  /**
   * Callback de fermeture
   */
  onClose: () => void;
  /**
   * Titre du modal
   */
  title: string;
  /**
   * Contenu du modal
   */
  children: ReactNode;
  /**
   * Footer avec actions
   */
  footer?: ReactNode;
  /**
   * Taille du modal
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Empêcher la fermeture au clic extérieur
   */
  preventOutsideClick?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

/**
 * Modal accessible avec overlay et gestion clavier
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Ajouter un produit"
 *   footer={
 *     <>
 *       <Button variant="outline" onClick={onClose}>Annuler</Button>
 *       <Button variant="primary" onClick={onSave}>Enregistrer</Button>
 *     </>
 *   }
 * >
 *   <p>Contenu du modal</p>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      size = 'md',
      preventOutsideClick = false,
      className,
      ...props
    },
    ref
  ) => {
    // Gestion de la touche Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Bloquer le scroll du body quand le modal est ouvert
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-night-300/50 backdrop-blur-sm"
          onClick={preventOutsideClick ? undefined : onClose}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <div
          ref={ref}
          className={cn(
            'relative w-full rounded-xl bg-white shadow-xl',
            'max-h-[90vh] overflow-y-auto',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sand-300 p-6">
            <h2
              id="modal-title"
              className="text-2xl font-semibold text-night-100"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-night-50 transition-colors hover:bg-sand-100 hover:text-night-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oasis-200"
              aria-label="Fermer le modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex justify-end gap-3 border-t border-sand-300 p-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
