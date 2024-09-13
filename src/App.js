import { html } from "zaphod";
import { useState } from "zaphod";
import { Square } from "./components/Square.js";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./utils/board.js";
import { WinnerModal } from "./components/Winner.js";
import { CreateBoard } from "./components/Board.js";

const App = () => {

	const [board, setBoard] = useState(Array(9).fill(null));

	const [turn, setTurn] = useState(TURNS.X);

	const [winner, setWinner] = useState(null);

	const updateBoard = (index) => {
		// dont update if the square is already filled or there is a winner
		if (board[index] !== null || winner) {
			return;
		}
		// update the board
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		// change the turn
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner);
		}
		else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	}

	const resetGame = () => {
		// set all the states to the initial state
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
	}

	return html`
	<main className='board'>
		<h1>Tic-Tac-Toe</h1>
		<button onClick=${resetGame}>Reset</button>
		<${CreateBoard} board=${board} updateBoard=${updateBoard} />
		<section className="turn">
			<${Square} isSelected=${turn === TURNS.X}>
				${TURNS.X}
			<//>
			<${Square} isSelected=${turn === TURNS.O}> 
				${TURNS.O}
			<//>
		</section>
		<${WinnerModal} winner=${winner} resetGame=${resetGame} />
		</main>
	`;
};

export default App;
