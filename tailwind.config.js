/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          900: '#2D1606', // deep dark roast
          800: '#5C3317', // rich espresso
          700: '#8B5A2B', // warm caramel
          600: '#8D6E63', // soft cinnamon
          500: '#C89B5A', // golden crema
          200: '#E8D8C3', // roasted bean skin
          100: '#F8F3EC', // warm cream
          50: '#FFF8F1',  // soft milk
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'glass-lg': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
