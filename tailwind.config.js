/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink': '#fff1f2', // rose-50
        'romantic-red': '#be123c', // rose-700
        'romantic-gold': '#fbbf24',
        'blush': '#fce7f3', // pink-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      }
    },
  },
  plugins: [],
}
