/**
 * Composant Button - Design System Optimus
 * Respecte WCAG 2.2 AA pour l'accessibilité
 */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-oasis-200 text-white hover:bg-oasis-300 focus-visible:ring-oasis-200',
        secondary:
          'bg-sand-400 text-night-100 hover:bg-sand-300 focus-visible:ring-sand-400',
        outline:
          'border-2 border-sand-400 text-sand-400 hover:bg-sand-50 focus-visible:ring-sand-400',
        ghost: 'text-night-100 hover:bg-sand-50 focus-visible:ring-sand-200',
        danger: 'bg-error text-white hover:bg-red-600 focus-visible:ring-error',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Contenu du bouton
   */
  children: ReactNode;
  /**
   * État de chargement
   */
  isLoading?: boolean;
  /**
   * Icône à gauche du texte
   */
  leftIcon?: ReactNode;
  /**
   * Icône à droite du texte
   */
  rightIcon?: ReactNode;
}

/**
 * Composant Button avec variants et accessibilité
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleSubmit}>
 *   Créer une commande
 * </Button>
 *
 * <Button variant="outline" leftIcon={<PlusIcon />}>
 *   Ajouter
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
