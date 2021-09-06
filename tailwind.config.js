module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        fontCyan: '#00ffff',
        landing: '#141414'
      },
      width: {
        '30': '7.5rem',
        '100': '60rem',
        '99': '50rem',
        '98': '40rem',
        '97.5': '35rem',
        '97': '30rem',
      },
    },
    fill: theme => ({
      'red': theme('colors.red.500'),
      'green': theme('colors.green.500'),
      'blue': theme('colors.blue.500'),
      'white': theme('colors.white'),
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
