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
        dotLoading: {
          '0%': {
            boxShadow: '0 2em 0 -1.3em',
          },
          '80%': {
            boxShadow: '0 2em 0 -1.3em',
          },
          '100%': {
            boxShadow: '0 2em 0 -1.3em',
          },
          '40%': {
            boxShadow: '0 2em 0 0',
          },
        },
        vibrate: {},
      },
      animation: {
        typing: 'typing 3s steps(44) 1 normal both, blinkCaret 0.75s steps(44) infinite normal',
        dotLoading: 'dotLoading 1.8s both ease-in-out infinite',
        vibrating: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1)',
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
