module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'day-bubble':
          '0px 1px 1px rgba(164, 152, 135, 0.321416), 0px 0px 1px #A39F98',
      },
      colors: {
        leaf: '#E1FFC7',
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
