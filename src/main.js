import { html, render } from 'zaphod';

function App (props) {
	return html`<h1>Hello ${props.name}!</h1>`;
}

render(html`<${App} name="Tuta" />`, document.getElementById('root'));
