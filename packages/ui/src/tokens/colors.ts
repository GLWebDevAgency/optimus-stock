/**
 * Design System Colors - Optimus Stock
 * Inspiré de l'art islamique et du désert
 */

export const colors = {
  // Primaires - Palette désert
  sand: {
    50: '#F5E7C6', // Sable doux (backgrounds, surfaces larges)
    100: '#EDD9A3',
    200: '#E5CB80',
    300: '#D4B569',
    400: '#C7A36D', // Dune dorée (accents, bordures)
  },

  night: {
    50: '#2B4F5F',
    100: '#1B3A4B', // Ciel nocturne (contenus riches, contraste fort)
    200: '#0F2633',
    300: '#091921',
  },

  oasis: {
    50: '#4ECDC4',
    100: '#2EB5AC',
    200: '#005F73', // Vert oasis (actions primaires, CTA)
    300: '#004A5A',
  },

  gold: {
    50: '#F0D98C',
    100: '#E4C76A',
    200: '#D4AF37', // Or calligraphique (highlights, typographie sacrée)
    300: '#B89830',
  },

  // Sémantiques
  success: '#2EB5AC',
  warning: '#E4C76A',
  error: '#C45050',
  info: '#4ECDC4',

  // Glassmorphism
  glass: {
    light: 'rgba(245, 231, 198, 0.7)', // sand.50 + opacity
    dark: 'rgba(27, 58, 75, 0.85)', // night.100 + opacity
    blur: '12px',
  },

  // Utilités
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
