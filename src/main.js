import { h, render } from 'zaphod';
import htm from 'zaphod-dom';

const html = htm.bind(h);

function App (props) {
	return html`<h1>Hello ${props.name}!</h1>`;
}

render(html`<${App} name="Tuta" />`, document.getElementById('root'));
