const colors = require('./colors.js');

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'light': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        'dark': '0 10px 15px -3px rgba(0, 0, 0, 0.8)',
      }
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
}
