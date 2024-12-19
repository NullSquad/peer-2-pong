function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function printMatches(matches) {
	let i = 0;
	for (const match of matches) {
		console.log(match);
		i++;
	}
	console.log(i);
}

function removeDuplicatedMatches(matches) {
	const seen = new Set();
	const unique_matches = [];
	
	for (const [a, b] of matches) {
		// Sort each pair alphabetically to make it order-independent
		const canonical = [a, b].sort().toString();
		
		if (!seen.has(canonical)) {
			seen.add(canonical);
			unique_matches.push([a, b]);
		}
	}
	
	return unique_matches;
}

function generateMatches(players, num_matches) {
	const matches = [];
	
	// Handling odd-odd case
	const num_players = (players.length * num_matches) % 2 === 0 ? players.length : players.length - 1;
	
	// Handle odd players case
	const odd = num_players % 2 === 0 ? 0 : 0.5;
	
	for (let iter_player = 0; iter_player < num_players; iter_player++) {
		for (let iter_match = 0; iter_match < Math.ceil(num_matches / 2); iter_match++) {
			// Skip invalid first match for even matches
			if (num_matches % 2 === 0 && iter_match === 0 && odd === 0) continue;
			
			// Handle odd-odd case
			if (num_players !== players.length && 
			    iter_match === 0 && 
			    (iter_player + 1) % (num_players / (num_matches - 1)) === 0) {
					matches.push([players[iter_player], players[num_players]]);
					continue;
				}
				
				// Give the last player a 'bye' when its odd-odd case
				if (num_players !== players.length &&
					iter_player === num_players - 1) {
						matches.push([players[num_players], "."]);
					}
					
					// Add forward and backward matches
					matches.push([
						players[iter_player], 
						players[(iter_player + iter_match - odd + num_players / 2) % num_players]
					]);
					matches.push([
						players[iter_player], 
						players[(iter_player - iter_match + odd + num_players / 2) % num_players]
					]);
		}
	}
	return matches;
}

function getMatches(players, num_matches) {
	shuffle(players);
	
	// Add ghost player if necessary
	if ((players.length * num_matches) % 2 !== 0 &&
	(players.length - 1) / (num_matches - 1) % 1 !== 0) {
		players.push("."); // Add ghost player
	}
	
	return removeDuplicatedMatches(generateMatches(players, num_matches));
}
/*
function removeGhostPlayer(matches) {
	const filtered = matches.filter(match => !match.includes("."));
	return filtered;
}*/