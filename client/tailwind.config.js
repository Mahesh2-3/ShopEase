/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#1C1B1F',
        cream: '#FBFAF7',
        brand: {
          50: '#E7F2F1',
          100: '#C3DFDD',
          200: '#9BCAC7',
          300: '#6EB2AD',
          400: '#3D9891',
          500: '#0F5257',
          600: '#0C4448',
          700: '#0A3639',
          800: '#07282A',
          900: '#041A1B',
        },
        accent: {
          DEFAULT: '#F2A93B',
          light: '#F8C876',
          dark: '#D98E1F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(15, 82, 87, 0.15)',
      },
    },
  },
  plugins: [],
};
