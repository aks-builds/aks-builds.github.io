/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07070e',
        surface: '#0e0e1c',
        primary: '#6366f1',
        'primary-light': '#818cf8',
        secondary: '#8b5cf6',
        accent: '#22d3ee',
        muted: '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
      },
      animation: {
        'float-a': 'floatA 10s ease-in-out infinite',
        'float-b': 'floatB 14s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        floatA: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%': { transform: 'translate(-25px, 20px) scale(1.03)' },
          '70%': { transform: 'translate(20px, -15px) scale(0.98)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
