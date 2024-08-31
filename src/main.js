import { html, render } from "zaphod";
import App from "./App.js";

render(html`<${App} />`, document.getElementById("root"));
