/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        button: '0 8px 0 0 rgba(16, 33, 42, 0.5)',
      },
      container: {
        center: true,
      },
      colors: {
        blue: 'hsl(var(--var-blue))',
        'blue-hover': 'hsl(var(--var-blue-hover))',
        yellow: 'hsl(var(--var-yellow))',
        'yellow-hover': 'hsl(var(--var-yellow-hover))',
        'dark-navy': 'hsl(var(--var-dark-navy))',
        'semidark-navy': 'hsl(var(--var-semidark-navy))',
        silver: 'hsl(var(--var-silver))',
        'silver-hover': 'hsl(var(--var-silver-hover))',
      },
      fontFamily: {
        sans: ['"Outfit Variable", sans-serif'],
      },
    },
  },
  plugins: [],
}
