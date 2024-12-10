import { useState } from "preact/hooks"
import Popup from "./Popup";

const Join = () => {
	const [message, setMessage] = useState("");
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleClick = async () => {
		try {
			const response = await fetch("https://api.example.com/endpoint", { // Cambiar url
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ // Datos a enviar
					username: "username",
					event_id: "event_id"
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setMessage(`Éxito: ${data.message || "Joibed successfully"}`);
			} else {
				const errorData = await response.json();
				setMessage(`Error: ${errorData.message || "Failed to join"}`);
			}
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		}
		setIsPopupOpen(true);
	};

	const closePopup = () => setIsPopupOpen(false);

	return (
		<div>
			<button
				onClick={handleClick}
				className="bg-primary-yellow shadow-yellow-50-700-sm text-white font-bold text-xl font-lilita-one border-2 border-black mr-1 w-24 h-8 sm:w-36 sm:h-10 sm:text-2xl -skew-x-[8deg] rounded-lg relative active:translate-y-[2px]"
			>
				<span
					className="inline-block skew-x-[8deg]"
					style={{
						WebkitTextStroke: "1px black",
						WebkitTextFillColor: "white",
					}}
				>
					JOIN
				</span>
			</button>
			{isPopupOpen && <Popup message={message} onClose={closePopup} />}
		</div>
	);
};

export default Join;
