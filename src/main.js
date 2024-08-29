import { html, render } from "zaphod";

const owners = [
    'Tito',
    'Tuta',
    'Dei',
	'Erik'
];

const Title = ({ children }) => {
	return html`
		<h1>${children}</h1>
	`;
}

const Card = ({ children }) => {
	console.log('[Card] render with name: ', name);
	return html`
		<div class=Card>${children}</div>
	`;
}

const App = () => {
    return html`
	<section>
	  ${owners.map((name) => html`
	    <${Card}>
			<${Title}>
				${name}
			<//>
		<//>
	  `
	  )}
	</section>
    `;
};

render(html`<${App} />`, document.getElementById("root"));
