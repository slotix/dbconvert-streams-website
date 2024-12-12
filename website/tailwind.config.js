/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js}",
    "./pages/**/*.vue",
    "./app.vue",
    "../shared/assets/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#0F7C94',
          dark: '#004258',
          light: '#E5F5F8',
        },
        secondary: {
          DEFAULT: '#DF6A47',
          dark: '#C85A3A',
          light: '#FFF5F0',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        fadeInUp: {
          from: { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-delay': 'fadeIn 0.8s ease-out 0.2s forwards',
        'fade-in-delay-2': 'fadeIn 0.8s ease-out 0.4s forwards',
        'fade-in-up': 'fadeInUp 1s ease-out 0.6s forwards'
      }
    },
  },
} 