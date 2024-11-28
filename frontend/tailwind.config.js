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
		plugin(function({ addBase, matchComponents, theme }) {
			addBase({
				'h1': { fontSize: '2rem', textShadow: '1px 1px 2px black' },
			})
			matchComponents(
				{
					'shadow-inner': (value) => {
						// value = [["t", "primary.yellow.100"], ["b", "primary.yellow.900"]];
						// return {
						// 	boxShadow: `inset 0 -.5em ${value}`
						// }
						if (value[0] == 's')
							value = value.substring(12);
						if (value[0] == '-')
							value = value.substring(1);
						let shadows = value.split("+");

						shadows = shadows.map(color => color.split("_"));
						shadows = shadows.map(combo => combo.map(color => color.replaceAll("-", ".")));
						shadows = shadows.map(combo => [combo[0] == 'b' ? '-' : '', combo[1]]);

						return {
							boxShadow: shadows.map(color => `inset 0 ${color[0]}.5em ${theme(color[1])}`).join(", ") 
						}
					},
					//'shadow-inner-btm': (value) => { return {
					//	boxShadow: `inset 0 -.5em ${value}`
					//}},
				}
			)
		})
	],

}
