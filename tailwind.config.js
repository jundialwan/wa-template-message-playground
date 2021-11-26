module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'day-bubble': '0px 1px 1px rgba(164, 152, 135, 0.321416), 0px 0px 1px #A39F98',
        'chat-bubble': '1px 1px 0px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        leaf: '#E1FFC7',
        leaf: {
          50: '#fefffc',
          100: '#fcfff9',
          200: '#f8fff1',
          300: '#f3ffe9',
          400: '#eaffd8',
          500: '#e1ffc7',
          600: '#cbe6b3',
          700: '#a9bf95',
          800: '#879977',
          900: '#6e7d62',
        },
        whatsapp: {
          500: '#00796B',
          600: '#006C60',
        },
        ocean: {
          100: '#D4EAF4',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
