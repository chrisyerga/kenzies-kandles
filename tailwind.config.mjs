/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        sans:   ['"Quicksand"', 'sans-serif'],
      },
      colors: {
        brand: {
          deep:    '#1a0533',
          purple:  '#6b21a8',
          violet:  '#8b5cf6',
          lavender:'#c4b5fd',
          pink:    '#f472b6',
          rose:    '#fb7185',
          gold:    '#fbbf24',
        },
      },
      animation: {
        'twinkle':  'twinkle 2.5s ease-in-out infinite',
        'float':    'float 5s ease-in-out infinite',
        'flame':    'flame 1.4s ease-in-out infinite alternate',
      },
      keyframes: {
        twinkle: {
          '0%,100%': { opacity: '0.1', transform: 'scale(0.7)' },
          '50%':     { opacity: '1',   transform: 'scale(1.2)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        flame: {
          '0%':   { transform: 'scaleX(1) rotate(-3deg) translateX(-50%)' },
          '100%': { transform: 'scaleX(0.85) rotate(3deg) translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
