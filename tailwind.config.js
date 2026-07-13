/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#080B12',
          900: '#0B0F19',
          800: '#111827',
          700: '#1A2233',
          600: '#232D42',
          500: '#334059',
        },
        paper: {
          50: '#F5F7FA',
          100: '#E7ECF3',
          200: '#C9D3E0',
        },
        cyan: {
          300: '#7DF0DE',
          400: '#4FE0CB',
          500: '#22C4AE',
        },
        amber: {
          300: '#FFCE7A',
          400: '#F5A623',
          500: '#D9860F',
        },
        magenta: {
          400: '#E36BB3',
        },
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        edge: 'rgb(var(--edge) / <alpha-value>)',
        page: 'rgb(var(--page) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent2: 'rgb(var(--accent2) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-overlay':
          'linear-gradient(to right, rgba(125,240,222,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(125,240,222,0.06) 1px, transparent 1px)',
        'glow-cyan': 'radial-gradient(circle at 50% 0%, rgba(79,224,203,0.25), transparent 60%)',
        'glow-amber': 'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.18), transparent 60%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.37)',
        glowCyan: '0 0 24px rgba(79,224,203,0.35)',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
