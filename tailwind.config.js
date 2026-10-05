/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F5EFE4',
        champagne: '#C6A66B',
        antique: '#A9894F',
        botanical: '#233D2D',
        forest: '#14251D',
        sunset: '#E9AD83',
        terracotta: '#A65D3E',
        charcoal: '#24221F',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
