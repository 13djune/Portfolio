const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Fuentes personalizadas
      fontFamily: {
        bit: ['Bit', 'sans-serif'],
        daydream: ['Daydream', 'cursive'],
   
      },
      // Todos los colores combinados en una sola sección
      colors: {
        // Colores del archivo index.css
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        hoveraccent: 'var(--hover-accent)',
        
        // Colores para el modo oscuro/inverso
        'text-inverse': 'var(--text-dark)',
        'background-inverse': 'var(--background-dark)',

        // Colores para el degradado
        'primary-gradient-start': 'var(--primary-gradient-start)',
        'primary-gradient-end': 'var(--primary-gradient-end)',


        white: '#F5F5F5',


        error: {
          0: '#E04E4E20',
          100: '#E04E4E',
          200: '#B31F1F',
          300: '#A21919',
        },
      },
    },
  },
  plugins: [],
}