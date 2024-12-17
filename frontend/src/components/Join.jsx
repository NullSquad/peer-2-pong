import { useState } from "preact/hooks";
import Popup from "./Popup";
import { joinCompetition } from "../services/competitionService";

const Join = ({ username, event_id }) => {
	const [message, setMessage] = useState("");
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleClick = async () => {
		const result = await joinCompetition(username, event_id);
		setMessage(result.message);
		setIsPopupOpen(true);
	};

	const closePopup = () => setIsPopupOpen(false);

	return (
		
<div>
  <button
    onClick={handleClick}
    className="bg-primary-yellow shadow-yellow-50-700 px-10 py-5 rounded-md text-white font-bold 
               text-xl text-stroke text-shadow font-lilita-one border-2 border-black w-30 h-2 sm:w-36 
               sm:h-8 sm:text-2xl -skew-x-[8deg] rounded-lg relative active:translate-y-[2px] 
               flex justify-center items-center"
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
