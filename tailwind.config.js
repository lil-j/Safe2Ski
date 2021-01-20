const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./pages/**/*.js', './components/**/*.js'],
    options: {
      safelist: {
        standard: [/^(bg|text)-(green|cyan|purple|pink)-(200|900)$/]
      }
    }
  },
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
      yellow:colors.yellow,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
