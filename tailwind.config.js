const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blueGray: colors.blueGray,
      blue:colors.blue,
      pink:colors.pink,
      white:colors.white,
      black:colors.black,
      green:colors.green,
      cyan:colors.cyan,
      purple:colors.purple,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
