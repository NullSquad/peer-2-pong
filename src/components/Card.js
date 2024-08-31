import { html } from "zaphod";

const Card = ({ children, image }) => {
	return html`
        	<h6>${children}</h6>
        	<img src=${image}/>
	`;
};

export default Card;
