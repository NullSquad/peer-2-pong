const	theme = (value) => {
	return (
		value
	)
}

const test = (value) => {
		// value = [["t", "primary.yellow.100"], ["b", "primary.yellow.900"]];
		if (value[0] == '-')
			value = value.substring(1);
		let shadows = value.split("+");

		console.log(shadows);
		shadows = shadows.map(color => color.split("_"));
		console.log(shadows);
		shadows = shadows.map(combo => combo.map(color => color.replaceAll("-", ".")));
		console.log(shadows);
		shadows = shadows.map(combo => [combo[0] == 'b' ? '-' : '', combo[1]]);
		console.log(shadows);

		return {
			boxShadow: shadows.map(color => `inset 0 ${color[0]}.5em ${theme(color[1])}`).join(", ") 
		}
	}

console.log(test("shadow-inner-t_colors-primary-yellow-100+b_colors-primary-yellow-900"));
