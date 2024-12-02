import CountdownTimer from "./CountdownTimer";
import CrownIcon from "../assets/CrownIcon.svg";

export function MatchCard({ player1, player2, targetDate }) {
  return (
    <div className="relative flex w-full max-w-4xl h-28 overflow-visible bg-gray-800">
      {/* Card Body with clip-path */}
      <div
        className="relative flex w-full h-full"
        style={{
          clipPath: "polygon(3% 15%, 100% 15%, 97% 85%, 0% 85%)",
        }}
      >
        <div className="flex items-center justify-between bg-blue-500 w-7/12 px-3 py-2 text-black">
          {/* Left Section: Crown + Player */}
          <div
            className="flex items-center w-5/6"
            style={{ paddingRight: "20px" }}
          >
            {/* Crown Icon */}
            <div className="flex justify-center w-1/2">
              <img src={CrownIcon} alt="Crown Icon" className="w-16 h-16" />
            </div>

            {/* Player Image and Name */}
            <div className="flex items-center">
              <img
                src={player1.image}
                alt={player1.name}
                className="w-16 h-16 rounded-full border-2 border-black mr-3"
              />
              <span className="text-sm md:text-lg font-bold">
                {player1.name}
              </span>
            </div>
            <div
              className="bg-gray-700 text-white p-1 px-2 rounded w-10 h-6 flex items-center justify-center absolute right-9"
              style={{
                bottom: "20px", // Adjust the vertical position if needed
              }}
            >
              <span className="font-bold text-sm">3</span> {/* Blue score */}
            </div>
          </div>

          {/* Right Section (if needed, for symmetry or other content) */}
        </div>
        {/* Space between blue and red */}
        <div className="w-1"></div>
        {/* Player 2 Side */}
        <div className="flex items-center justify-center bg-red-500 w-5/12 px-3 py-2 text-black">
          <span className="text-sm md:text-lg font-bold mr-2">
            {player2.name}
          </span>
          <img
            src={player2.image}
            alt={player2.name}
            className="w-16 h-16 rounded-full border-2 border-black"
          />
        </div>
      </div>

      {/* Time Left Container */}
      <div
        className="absolute right-0 bottom-[-20px] sm:right-2 sm:bottom-[-30px] md:right-[26px] md:bottom-[-20px] bg-gray-900 text-white text-xs sm:text-sm md:text-sm p-1 md:p-2 rounded-lg z-10"
        style={{
          width: "max-content",
        }}
      >
        Time left: <CountdownTimer targetDate={targetDate} />
      </div>
    </div>
  );
}

export default MatchCard;
