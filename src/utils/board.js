import { WINNER_COMBINATIONS } from '../constants.js';

export const checkWinner = (boardToCheck) => {
	// check if there is a winner
	for (const combination of WINNER_COMBINATIONS) {
		const [a, b, c] = combination;
		if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
			return boardToCheck[a];
		}
	}
	return null;
}

export	const checkEndGame = (boardToCheck) => {
	// check if there is a tie
	// if all the squares are filled and there is no winner
	return boardToCheck.every((square) => square !== null);
}
