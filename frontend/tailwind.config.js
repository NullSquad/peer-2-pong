export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Fugaz One', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        50: '#eaddd7',
        100: '#e0cec7',
        300: '#d2bab0',
        DEFAULT: '#bfa094',
        700: '#977669',
        900: '#43302b',
      },
      primary: {
        light: '#FCEFB0',
        DEFAULT: '#F0C808',
        dark: '#BC7D25',
      },
    },
  },
  plugins: [],
}

