import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red:    '#E8192C',
          orange: '#FF6B35',
          yellow: '#FFD700',
          dark:   '#1A0A00',
        },
        surface: {
          DEFAULT: '#1C1C1E',
          light:   '#2C2C2E',
          border:  '#3A3A3C',
        },
        food: {
          green:  '#34C759',
          blue:   '#007AFF',
          purple: '#AF52DE',
          pink:   '#FF2D55',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'sans-serif'],
        body:    ['"Inter"', 'ui-sans-serif', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #E8192C 0%, #FF6B35 50%, #FFD700 100%)',
        'card-gradient': 'linear-gradient(145deg, #2C2C2E 0%, #1C1C1E 100%)',
        'red-glow':      'radial-gradient(ellipse at center, rgba(232,25,44,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'red':       '0 0 30px rgba(232,25,44,0.3)',
        'card':      '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':'0 12px 40px rgba(0,0,0,0.6)',
        'float':     '0 20px 60px rgba(0,0,0,0.5)',
      },
      animation: {
        'marquee':     'marquee 20s linear infinite',
        'float':       'float 4s ease-in-out infinite',
        'pulse-red':   'pulse-red 2s ease-in-out infinite',
        'slide-up':    'slideUp 0.4s ease-out',
        'bounce-in':   'bounceIn 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)',
        'shimmer':     'shimmer 2s infinite',
        'spin-slow':   'spin 6s linear infinite',
        'wiggle':      'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        marquee:    { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'pulse-red':{ '0%,100%': { boxShadow: '0 0 15px rgba(232,25,44,0.2)' }, '50%': { boxShadow: '0 0 30px rgba(232,25,44,0.5)' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        bounceIn:   { from: { opacity: '0', transform: 'scale(0.3)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer:    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        wiggle:     { '0%,100%': { transform: 'rotate(0deg)' }, '25%': { transform: 'rotate(-5deg)' }, '75%': { transform: 'rotate(5deg)' } },
      },
    },
  },
  plugins: [],
} satisfies Config
