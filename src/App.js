import { createRoot } from "../modules/zaphod/react-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement('h1', null, 'Hello, world'));
