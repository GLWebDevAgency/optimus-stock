/**
 * Design System Typography - Optimus Stock
 */

export const typography = {
  fonts: {
    latin: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    arabic: 'Amiri, "Scheherazade New", serif', // Calligraphie lisible
  },

  sizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px (minimum WCAG)
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },

  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export type TypographySize = keyof typeof typography.sizes;
export type TypographyWeight = keyof typeof typography.weights;
