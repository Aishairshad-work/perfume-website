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
          100: '#FBF9F5',
          200: '#F5F0E6',
          300: '#EFE8DB',
          400: '#E2D5BF',
          500: '#D5C2A3',
        },
        champagne: {
          light: '#F4ECE1',
          DEFAULT: '#E6D7C3',
          dark: '#CCA978',
        },
        beige: {
          light: '#EFEAE2',
          DEFAULT: '#DFD7CC',
          dark: '#B8AFA2',
        },
        gold: {
          light: '#E7C87A',
          DEFAULT: '#C5A059',
          muted: '#B38E46',
          dark: '#8C6C29',
          antique: '#9B783E',
        },
        espresso: {
          900: '#0A0806',
          800: '#140E0A',
          700: '#1D1612',
          600: '#2A1F19',
          500: '#3D2F27',
          400: '#5A463B',
        },
        obsidian: {
          DEFAULT: '#0A0908',
          card: '#12100E',
          border: '#23201D',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Playfair Display"', 'cursive'],
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
