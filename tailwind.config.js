/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./src/pages/**/*', './src/components/**/*'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg_secondary: '#151B2D',
        bg_third: '#20293A',
        bg_primary: '#111729',
      },
    },
  },
  plugins: [],
};
