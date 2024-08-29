import { html, render } from "zaphod";

const owners = [
    'Tito',
    'Tuta',
    'Dei',
	'Erik'
];

const Card = ({ children, name }) => {
	console.log('[Card] render with name: ', name);
	return html`
		<h1>${name}</h1>
	`;
}

const App = () => {
    return html`
	<section>
	  ${owners.map((name) => html`
	    <${Card} name=${name}/>
	  `
	  )}
	</section>
    `;
};

render(html`<${App} />`, document.getElementById("root"));
