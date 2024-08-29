import { html, render } from "zaphod";

const Header = ({ children, ...props }) => {
    console.log(children);
    return html`
        <div>
            <a> ${props.name} ${props.tmp} </a>
            ${children}
        </div>
    `;
};

const Footer = () => {
    return html`
        <div>
            <p>hmmmm pies</p>
        </div>
    `;
};

const App = () => {
    return html`
        <${Header} name="Eric" tmp="txt">
            <h1>yeah</h1>
            <h1>perdonen</h1>
        <//>
        <${Footer} />
    `;
};

render(html`<${App} />`, document.getElementById("root"));
