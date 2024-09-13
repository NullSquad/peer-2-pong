import { html } from "zaphod";

export const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = isSelected ? "is-selected" : '';

	const handleClick = () => {
		updateBoard(index);
	}
	return html`
		<div onClick=${handleClick} class="square ${className}">
			${children}
		</div>
	`;
};
