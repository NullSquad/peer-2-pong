import { html } from "zaphod";
import { useState } from "zaphod";
import { Square } from "./components/Square.js";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./utils/board.js";
import { WinnerModal } from "./components/Winner.js";
import { CreateBoard } from "./components/Board.js";

const App = () => {

	const [board, setBoard] = useState(() => {
		// get the saved board from the local localStorage
		// if there is no saved board, create a new one
		const savedBoard = window.localStorage.getItem('board');
		return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
	});

	const [turn, setTurn] = useState(() => {
		// get the saved turn from the local localStorage
		// if there is no saved turn, set it to X
		const savedTurn = window.localStorage.getItem('turn');
		return savedTurn ? savedTurn : TURNS.X;
	});

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
		// save game
		window.localStorage.setItem('board', JSON.stringify(newBoard));
		window.localStorage.setItem('turn', newTurn);

		// check if there is a winner or a tie
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

		window.localStorage.removeItem('board');
		window.localStorage.removeItem('turn');
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
