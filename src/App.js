import { html, useEffect, useState } from "zaphod";

const App = () => {

	const [enabled, setEnabled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		console.log("Effect", { enabled });

		const handleMove = (event) => {
			const { clientX, clientY } = event;
			console.log("Move", { clientX, clientY });
			setPosition({ x: clientX, y: clientY });
		};
		if (enabled) {
			window.addEventListener('pointermove', handleMove);
		}
		return () => { // cleanup method
			console.log('cleanup')
			window.removeEventListener('pointermove', handleMove)
		}

	}, [enabled]);

	return html`
	<main>
		<div style=${{
			position: "absolute",
			backgroundColor: "rgba(0, 153, 255, 0.5)",
			border: "1px solid #09f",
			borderRadius: "50%",
			oppacity: 0.8,
			pointerEvents: "none",
			left: -20,
			top: -20,
			width: 40,
			height: 40,
			transform: `translate(${position.x}px, ${position.y}px)`,
		}}>
		</div>
		<h3>useEffect</h3>
		<button onclick=${() => setEnabled(!enabled)}>
			${enabled ? "Disable" : "Enable"} follow mouse
		</button>
	</main>
	`;
};

export default App;
