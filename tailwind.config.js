/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:      ["'Plus Jakarta Sans'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:      ["'Plus Jakarta Sans'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:      ["'Space Mono'", "'JetBrains Mono'", 'ui-monospace', 'monospace'],
        // Editorial display serif — hero + section headlines (wisperflow vibe)
        display:   ["'EB Garamond'", 'Georgia', "'Times New Roman'", 'serif'],
        editorial: ["'EB Garamond'", 'Georgia', "'Times New Roman'", 'serif'],
        // Brand wordmark only — italic serif, used for the Gathos logotype
        logo:      ["'Instrument Serif'", 'Georgia', "'Times New Roman'", 'serif'],
      },
      colors: {
        // ─── Clay palette ───────────────────────────────────────────────
        cream:    '#faf9f7',   // page background
        'oat-50': '#eee9df',   // light oat
        'oat':    '#dad4c8',   // primary border tone
        'oat-dark': '#b8aea0',
        'warm-silver':   '#9f9b93',
        'warm-charcoal': '#55534e',

        // Named swatches
        matcha:  { 300: '#84e7a5', 600: '#078a52', 800: '#02492a' },
        slushie: { 500: '#3bd3fd', 800: '#0089ad' },
        lemon:   { 400: '#f8cc65', 500: '#fbbd41', 700: '#d08a11', 800: '#9d6a09' },
        ube:     { 300: '#c1b0ff', 800: '#43089f', 900: '#32037d' },
        pomegranate: { 400: '#fc7981' },
        blueberry:   { 800: '#01418d' },
        dragonfruit: { 500: '#ff2ea5' },
        // Wisperflow signature — pale lavender CTA fill
        lavender:    '#f0d7ff',

        // Legacy tokens remapped to Clay light palette — dashboard/login/legal
        // pick up the new theme automatically without rewriting each page.
        'bg-deep':       '#faf9f7',   // cream
        'bg-surface':    '#f3f0e8',   // oat-50 tint
        'bg-card':       '#ffffff',   // white card surface
        'bg-card-hover': '#faf6ee',   // warm hover
        'border-subtle': '#e7e1d3',   // hairline oat
        'border-glow':   'rgba(10,10,10,0.15)',
        violet:  '#02492a',   // matcha-800 (accent)
        indigo:  '#078a52',   // matcha-600
        cyan:    '#0089ad',   // slushie-800
        emerald: '#078a52',
        amber:   '#d08a11',   // lemon-700
        rose:    '#fc7981',   // pomegranate-400
        'text-primary':   '#0a0a0a',
        'text-secondary': '#55534e',  // warm-charcoal
        'text-tertiary':  '#9f9b93',  // warm-silver
      },
      borderRadius: {
        'clay-card':    '12px',
        'clay-feature': '24px',
        'clay-section': '40px',
        'pill':         '999px',
      },
      boxShadow: {
        'clay': '0 1px 1px rgba(0,0,0,0.10), inset 0 -1px 1px rgba(0,0,0,0.04), 0 -0.5px 1px rgba(0,0,0,0.05)',
        'clay-hard': '-7px 7px 0 rgba(0,0,0,1)',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
    },
  },
  plugins: [],
}
