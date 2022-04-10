const colors = require('./colors.js');

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        light: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        dark: '0 10px 15px -3px rgba(0, 0, 0, 0.8)',
      },
      spacing: {
        'header-height': '50px',
      },
      maxWidth: {
        page: '580px',
      },
      keyframes: {
        typing: {
          '0%': { width: 0 },
          '100%': { width: '100%' },
        },
        blinkCaret: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: 'rgb(var(--color-orange-dark) / var(--tw-bg-opacity))' },
          '100%': { borderColor: 'transparent' },
        },
      },
      animation: {
        typing: 'typing 3s steps(44) 1 normal both, blinkCaret 0.75s steps(44) infinite normal',
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors,
  },
  plugins: [],
};
