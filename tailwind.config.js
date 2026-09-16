/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#ECE4D6',
          400: '#DFD3BF',
          500: '#D0BF9F',
        },
        champagne: {
          light: '#F8F3EC',
          DEFAULT: '#ECE1D2',
          dark: '#D4B892',
        },
        beige: {
          light: '#F4EFE7',
          DEFAULT: '#E5DCcf',
          dark: '#B8AFA2',
        },
        taupe: {
          light: '#ECE7E1',
          DEFAULT: '#D6CFC7',
          dark: '#8C8277',
        },
        gold: {
          light: '#E5C984',
          DEFAULT: '#C5A059',
          muted: '#AD8944',
          dark: '#8A6A27',
          antique: '#9B783E',
        },
        espresso: {
          900: '#17120F',
          800: '#261F1B',
          700: '#3D322B',
          600: '#56483E',
          500: '#756559',
          400: '#948478',
          300: '#B8ABA0',
        },
      },
      fontFamily: {
        serif: ['Cinzel', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'ultra-wide': '0.35em',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'glow-soft': 'glowSoft 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        glowSoft: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
