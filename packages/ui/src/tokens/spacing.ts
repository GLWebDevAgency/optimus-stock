/**
 * Design System Spacing - Optimus Stock
 */

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
} as const;

export const radii = {
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(27, 58, 75, 0.05)',
  md: '0 4px 6px -1px rgba(27, 58, 75, 0.1)',
  lg: '0 10px 15px -3px rgba(27, 58, 75, 0.1)',
  xl: '0 20px 25px -5px rgba(27, 58, 75, 0.1)',
  glass: '0 8px 32px 0 rgba(27, 58, 75, 0.15)', // Glassmorphism
} as const;

export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radii;
export type ShadowKey = keyof typeof shadows;
