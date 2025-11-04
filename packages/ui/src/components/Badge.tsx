/**
 * Composant Badge - Design System Optimus
 * Pour afficher des statuts, tags, ou labels
 */
import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-sand-100 text-night-100',
        primary: 'bg-oasis-200 text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-night-300',
        error: 'bg-error text-white',
        info: 'bg-info text-white',
        outline: 'border-2 border-sand-400 text-sand-400 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Contenu du badge
   */
  children: ReactNode;
}

/**
 * Composant Badge pour afficher des statuts ou tags
 *
 * @example
 * ```tsx
 * <Badge variant="success">En stock</Badge>
 * <Badge variant="warning">Stock bas</Badge>
 * <Badge variant="error">Rupture</Badge>
 * ```
 */
export function Badge({ className, variant, children, ...props }: BadgeProps): JSX.Element {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
