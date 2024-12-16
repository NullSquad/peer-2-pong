import { useState } from "preact/hooks";
import Popup from "./Popup";
import { route } from "preact-router";
import { joinCompetition } from "../services/competitionService";
import  BackArrow from "../assets/back_arrow.svg"

const MoveBack = ({ username, event_id }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMoveBack = () => {
    route("/");
  };

	return (

    <div>
      <button
        onClick={handleMoveBack}
        className="bg-primary-yellow shadow-yellow-50-700 px-8 py-5 rounded-md text-white font-bold text-xl
        text-stroke text-shadow font-lilita-one border-2 border-black h-6 sm:w-36 sm:h-8 sm:text-2xl
        -skew-x-[8deg] rounded-lg relative active:translate-y-[2px] flex justify-center items-center"
      >
        <span
          classNameclassName="inline-block skew-x-[8deg]"
          style={{
            WebkitTextStroke: "1px black",
            WebkitTextFillColor: "white",
          }}
        >
          <img
            src={BackArrow}
            alt="To move back"
          />

        </span>
      </button>
      {isPopupOpen && <Popup message={message} onClose={closePopup} />}
    </div>
  );
};


export default MoveBack;
