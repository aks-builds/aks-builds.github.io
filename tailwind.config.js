/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0a0a0a',
        surface: '#0d0d0d',
        border:  '#161616',
        primary: '#22c55e',
        'primary-light': '#4ade80',
        muted:   '#52525b',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-a':  'floatA 10s ease-in-out infinite',
        'float-b':  'floatB 14s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        floatA: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-20px) scale(1.04)' },
          '66%':     { transform: 'translate(-20px,15px) scale(.97)' },
        },
        floatB: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '40%':     { transform: 'translate(-25px,20px) scale(1.03)' },
          '70%':     { transform: 'translate(20px,-15px) scale(.98)' },
        },
        glowPulse: {
          '0%,100%': { textShadow: '0 0 10px rgba(34,197,94,.25)' },
          '50%':     { textShadow: '0 0 22px rgba(34,197,94,.55), 0 0 40px rgba(34,197,94,.15)' },
        },
      },
    },
  },
  plugins: [],
}
