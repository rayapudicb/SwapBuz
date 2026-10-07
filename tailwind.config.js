/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#07090E',
          card: '#0F131D',
          border: '#1E2638',
          accent: '#6366F1',
          emerald: '#10B981',
          fuchsia: '#D946EF',
          gold: '#F59E0B',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: 0.4, transform: 'scale(1)' },
          '100%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
