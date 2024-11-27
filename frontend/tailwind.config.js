const plugin = require('tailwindcss/plugin')

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Fugaz One', 'sans-serif'],
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				neutral: {
					DEFAULT: '#FFFFFF',
					grey: {
						50: '#F8F9FA',
						100: '#F1F3F5',
						200: '#E9ECEF',
						300: '#DEE2E6',
						400: '#CED4DA',
						DEFAULT: '#ADB5BD',
						600: '#868E96',
						700: '#495057',
						800: '#343A40',
						900: '#212529',
					},
					black: '#000000',
				},
				primary: {
					yellow: {
						50: '#FCEFB0',
						100: '#FFD81D',
						300: '#F8D83A',
						500: '#F0C808',
						700: '#BC7D25',
						900: '#A6552D',
					},
				},
				accent: {
					blue: {
						light: '#5DC3FD',
						DEFAULT: '#0FA7FE',
						dark: '#0174B7',
						ocean: '#094CF0',
					},
					red: {
						light: '#EB5151',
						DEFAULT: '#E52424',
						dark: '#B71515',
					}
				},
			},
		}
	},
	plugins: [
		plugin(function({ addBase, addComponents, theme }) {
			addBase({
				'h1': { fontSize: '2rem', textShadow: '1px 1px 2px black' },
			})
			addComponents({
				'.shadow-item': {
					boxShadow: `inset 0 .5em ${theme("colors.primary.yellow.100")}, inset 0px -.5em ${theme("colors.primary.yellow.700")}`
				},
			})
		})
	],

}
