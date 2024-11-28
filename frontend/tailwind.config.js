const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')

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
				myred: '#FF0000',
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
						DEFAULT: '#F0C808',
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
			clipPath: {
				'paralel': ''
			}
		}
	},
	plugins: [
		plugin(function({ addBase, addComponents, matchComponents, theme }) {
			addBase({
				'h1': { fontSize: '2.5rem', textShadow: '1px 1px 2px black' },
				'h2': { fontSize: '2rem', textShadow: '1px 1px 2px black' },
				'h3': { fontSize: '1.75rem', textShadow: '1px 1px 2px black' },
				'h4': { fontSize: '1.5rem', textShadow: '1px 1px 2px black' },
				'h5': { fontSize: '1.25rem', textShadow: '1px 1px 2px black' },
				'h6': { fontSize: '1rem', textShadow: '1px 1px 2px black' },
			})
			addComponents({
				'.shadow-yellow-50-700': {
					boxShadow: `inset 0 .3em ${theme('colors.primary.yellow.50')}, inset 0 -.3em ${theme('colors.primary.yellow.700')}`
				},
				'.shadow-yellow-100-700': {
					boxShadow: `inset 0 .5em ${theme('colors.primary.yellow.100')}, inset 0 -.5em ${theme('colors.primary.yellow.700')}`
				},
				'.shadow-blue-ocean': {
					boxShadow: `inset 0 .15em ${theme('colors.accent.blue.light')}, inset 0 -.15em ${theme('colors.accent.blue.ocean')}`
				},
				'.shadow-red-light-dark': {
					boxShadow: `inset 0 .15em ${theme('colors.accent.red.light')}, inset 0 -.15em ${theme('colors.accent.red.dark')}`
				},
				'.parallelogram': {
        	clipPath: 'polygon(3% 15%, 100% 15%, 97% 85%, 0% 85%)'
				}, 
				'.parallelogram-tuta': {
        	clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)'
				}, 
				'.parallelogram-banner': {
        	clipPath: 'polygon(0% 0, 100% 0, 92% 100%, 0% 100%)'
				}, 
			})
		})
	],

}
//plugin(({ matchUtilities, theme }) => {
//			matchUtilities(
//				{
//					"shadow-inner-top": (value) => ({
//						boxShadow: `inset 0 .5em ${value}`
//					})
//				},
//				{ 
//					values: flattenColorPalette(theme("colors")), 
//					type: "color" 
//				}
//			);
//		})
//
//matchComponents(
//	{
//		'shadow-item': (value) => {
//			// value = [["t", "primary.yellow.100"], ["b", "primary.yellow.900"]];
//			if (value[0] == 's')
//				value = value.substring(12);
//			if (value[0] == '-')
//				value = value.substring(1);

//			let shadows = value.split("+");

//			shadows = shadows.map(color => color.split("_"));
//			shadows = shadows.map(combo => combo.map(color => color.replaceAll("-", ".")));
//			shadows = shadows.map(combo => [combo[0] == 'b' ? '-' : '', combo[1]]);

//			return {
//				boxShadow: shadows.map(color => `inset 0 ${color[0]}.5em ${theme('colors.' + color[1])}`).join(", ") 
//			}
//		},
//		//'shadow-inner-btm': (value) => { return {
//		//	boxShadow: `inset 0 -.5em ${value}`
//		//}},
//	}
//)
