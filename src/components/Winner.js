import { html } from "zaphod";
import { Square } from "./Square.js";

export function WinnerModal ({winner, resetGame}) {
	if (winner === null) {
		return null;
	}
	const winnerText = winner === false ? "It's a tie!" : `Player ${winner} wins!`;
	return html`
			<section className="winner">
				<div className="text">
					<h2>${winnerText}</h2>
				<header className="win">
					${winner && html `<${Square}>${winner}<//>`}
				</header>
				<footer>
					<button onClick=${resetGame}>Play again</button>
				</footer>
				</div>
			</section>
		`;
}
