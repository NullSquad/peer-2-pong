import { html } from "zaphod";
import { Square } from "./Square.js";

export function CreateBoard ({ board, updateBoard }) {
	return html `
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
	`;
}
