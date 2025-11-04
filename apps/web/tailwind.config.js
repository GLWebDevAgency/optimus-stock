/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#F5E7C6',
          100: '#EDD9A3',
          200: '#E5CB80',
          300: '#D4B569',
          400: '#C7A36D',
        },
        night: {
          50: '#2B4F5F',
          100: '#1B3A4B',
          200: '#0F2633',
          300: '#091921',
        },
        oasis: {
          50: '#4ECDC4',
          100: '#2EB5AC',
          200: '#005F73',
          300: '#004A5A',
        },
        gold: {
          50: '#F0D98C',
          100: '#E4C76A',
          200: '#D4AF37',
          300: '#B89830',
        },
        success: '#2EB5AC',
        warning: '#E4C76A',
        error: '#C45050',
        info: '#4ECDC4',
        'glass-light': 'rgba(245, 231, 198, 0.7)',
        'glass-dark': 'rgba(27, 58, 75, 0.85)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        arabic: ['Amiri', 'Scheherazade New', 'serif'],
      },
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(27, 58, 75, 0.15)',
      },
    },
  },
  plugins: [],
};
