import { html } from "zaphod";
import { useState } from "zaphod";
import Card from "./components/Card.js";

const TURNS = {
	X: "X",
	O: "O",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = isSelected ? "is-selected" : '';
	console.log(className);

	const handleClick = () => {
		updateBoard(index);
	}
	return html`
		<div onClick=${updateBoard} class="square ${className}">
			${children}
		</div>
	`;
};


const App = () => {

	const [board, setBoard] = useState(Array(9).fill(null));

	const [turn, setTurn] = useState(TURNS.X);

	const updateBoard = (index) => {
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
	}

	return html`
	<main className='board'>
		<h1>Tic-Tac-Toe</h1>
		<section className="game">
			${board.map((_, index) => html`
				<${Square} 
					key=${index}
					index=${index}
					updateBoard=${updateBoard}
				>
				${board[index]}
				<//>
			`)}
		</section>
		<section className="turn">
			<${Square} isSelected=${turn === TURNS.X}>
				${TURNS.X}
			<//>
			<${Square} isSelected=${turn === TURNS.O}> 
				${TURNS.O}
			<//>
		</section>
		</main>
	`;
};

export default App;
