/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A6DFF',
        secondary: '#212121',
        lightBlue: '#4993FF',
        paleBlue: '#8AADFF',
        lightGray: '#E3E7F0',
        textGray: '#949598',
        darkGray: '#646464',
        background: '#FFFFFF',
        dark: '#212121',
      },
      fontFamily: {
        'century': ['"Century Gothic"', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1400px',
        },
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      spacing: {
        '48': '48px',
        '105': '105px',
        '121': '121px',
      },
      letterSpacing: {
        tighter: '-0.01em',
      },
    },
  },
  plugins: [
    // line-clamp теперь встроен в Tailwind CSS v3.3
  ],
}
