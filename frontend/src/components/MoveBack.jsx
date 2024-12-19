import { useState } from "preact/hooks";
import Popup from "./Popup";
import { route } from "preact-router";
//import { joinCompetition } from "../services/competitionService";
import BackArrow from "../assets/back_arrow.svg";

const MoveBack = ({ username, event_id }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMoveBack = () => {
    route("/");
  };

  return (
    <div>
      <button
        onClick={handleMoveBack}
        className="bg-primary-yellow shadow-yellow-50-700 px-4 py-2 rounded-md text-white font-bold text-xl
               text-stroke text-shadow font-lilita-one border-2 border-black sm:w-14 sm:h-10 sm:text-2xl
               -skew-x-[2.5deg] relative active:translate-y-[2px] flex justify-center items-center"
      >
        <div className="flex items-center justify-center h-full w-full">
          <img
            className="h-full w-full max-h-full max-w-full object-contain"
            src={BackArrow}
            alt="To move back"
          />
        </div>
      </button>
      {isPopupOpen && <Popup message={message} onClose={closePopup} />}
    </div>
  );
};

export default MoveBack;
