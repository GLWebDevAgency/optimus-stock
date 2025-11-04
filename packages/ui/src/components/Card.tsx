/**
 * Composant Card - Design System Optimus
 * Supporte le style glassmorphism
 */
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const cardVariants = cva('rounded-lg transition-all', {
  variants: {
    variant: {
      default: 'bg-white border border-sand-300 shadow-md',
      glass:
        'bg-glass-light backdrop-blur-md border border-gold-200/20 shadow-glass dark:bg-glass-dark',
      elevated: 'bg-white shadow-xl border-0',
      outlined: 'bg-transparent border-2 border-sand-400',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    hoverable: {
      true: 'hover:shadow-lg cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    hoverable: false,
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Contenu de la carte
   */
  children: ReactNode;
}

/**
 * Composant Card pour afficher du contenu dans un conteneur stylisé
 *
 * @example
 * ```tsx
 * <Card variant="glass" padding="lg">
 *   <h2>Titre</h2>
 *   <p>Contenu</p>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
