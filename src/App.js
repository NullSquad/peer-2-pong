import { h, render } from '../modules/zaphod/zaphod.js';
import htm from '../modules/zaphod/zaphod-dom.js';

const html = htm.bind(h);

function App (props) {
	return html`<h1>Hello ${props.name}!</h1>`;
}

render(html`<${App} name="Tuta" />`, document.body);
