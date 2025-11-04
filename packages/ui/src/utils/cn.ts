/**
 * Utility pour merger les classes Tailwind
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine et merge les classes CSS avec Tailwind
 * 
 * @example
 * ```typescript
 * cn('px-2 py-1', condition && 'bg-blue-500', 'hover:bg-blue-600')
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
