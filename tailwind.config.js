/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: { beige: '#D8C7A5' },
        warm: { sand: '#CDBB96' },
        deep: { forest: '#10251B' },
        muted: { gold: '#C9A45C' },
        dark: { bronze: '#6F5732' },
        soft: { cream: '#E7DCC4' },
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
