/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#06060B',
        'bg-secondary': '#0C0D14',
        'bg-surface': '#13141D',
        'bg-elevated': '#1A1B27',
        // Text
        'text-primary': '#F0F0F3',
        'text-secondary': '#A0A3B1',
        'text-muted': '#5C5F73',
        // Accents
        'accent': '#06B6D4',
        'accent-light': '#22D3EE',
        'accent-secondary': '#8B5CF6',
        // Borders
        'border-default': '#1E1F2E',
        'border-hover': '#2D2F42',
        // States
        'success': '#22C55E',
        'warning': '#EAB308',
        'error': '#EF4444',
      },
      fontFamily: {
        'display': ['Outfit', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-mobile': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1-mobile': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1.0625rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'content': '1200px',
        'narrow': '800px',
        'text': '680px',
      },
      borderRadius: {
        'card': '16px',
        'input': '12px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-lg': '0 0 30px rgba(6, 182, 212, 0.25)',
        'glow-accent': '0 0 20px rgba(6, 182, 212, 0.1)',
        'elevated': '0 16px 48px rgba(0,0,0,0.4), 0 0 1px rgba(6,182,212,0.1)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-page': 'linear-gradient(180deg, #0A0B14 0%, #06060B 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
        'gradient-card-hover': 'linear-gradient(135deg, rgba(6,182,212,0.05), rgba(139,92,246,0.05))',
      },
    },
  },
  plugins: [],
}
