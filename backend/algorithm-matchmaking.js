function shuffle(array) {
	// Fisher-Yates shuffle algorithm
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function generateMatches(players) {}
	shuffle(players);
	const matches = [];
	n = players.length;

	matches.push([players[n - 1], players[0]]);
	for (let i = 0; i < n - 1; i++) {
		matches.push([players[i], players[i + 1]]);
	}
	if (n % 2 === 0) {
		for (let i = 0; i < n/2; i++) {
			let j = i + n/2 > n - 1 ? i + n/2 - n : i + n/2;
			matches.push([players[i], players[j]])
		}
	}
	else {
		for (let i = 0; i < n/2 - 1 + 0.5; i++) {
			let j = i + n/2 + 0.5 > n - 1 ? i + n/2 + 0.5 - n : i + n/2 + 0.5;
			matches.push([players[i], players[j]])
		}
		matches.push([players[n/2 - 1 + 0.5]]);
	}
	return matches;
}
