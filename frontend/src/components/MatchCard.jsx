import CrownIcon from "../assets/CrownIcon.svg";

// MATCH CARD COMPONENT STATE #5
// This component will be used to display a match card with two players and their scores after a match
// The winner will have a bigger card size and the crown icon will be displayed on their side

export function MatchCard({ player1, player2, result }) {

  const blueCardSize = result.blue > result.red ? "w-9/12" : "w-5/12";
  const redCardSize = result.red > result.blue ? "w-9/12" : "w-5/12";
  const crownPosition = result.blue > result.red ? "right-[80%]" : "right-[20%]";
  const blueImagePosition = result.blue > result.red ? "right-[55%]" : "right-[82%]";
  const redImagePosition =result.blue < result.red ? "left-[45%]" : "left-[72%]";

  return (
    <div className="relative flex w-full max-w-4xl h-28 overflow-visible bg-gray-800">
      {/* Card Body */}
      <div className="relative flex w-full h-14 sm:h-16 m-2 parallelogram">
        {/* Blue card */}
        <div
          className={`relative flex items-center justify-between bg-blue-500 ${blueCardSize} px-3 py-2 text-black`}
        >
          {/* Blue score */}
          <div
            className="absolute sm:right-4 right-2 top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <span className="font-bold text-sm sm:text-lg">{result.blue}</span>{" "}
          </div>
        </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Red card */}
        <div
          className={`relative flex items-center justify-center ${redCardSize} bg-red-500 px-3 py-2 text-black`}
        >
          {/* Red score */}
          <div
            className="absolute sm:left-4 left-2 top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <span className="font-bold text-sm sm:text-lg">{result.red}</span>{" "}
          </div>
        </div>

        {/* Player Images */}
        <div className="flex items-center">
          <img
            src={player1.image}
            alt={player1.name}
            className={`absolute ${blueImagePosition} translate-x-1/2 w-12 sm:w-14 rounded-full border-2 border-black mr-3`}
          />
          <img
            src={player2.image}
            alt={player2.name}
            className={`absolute ${redImagePosition} translate-x-1/2 w-12 sm:w-14 rounded-full border-2 border-black`}
          />
        </div>

        {/* Crown Icon */}
        <div
          className={`absolute ${crownPosition} translate-x-[50%] flex justify-center w-1/3`}
        >
          <img src={CrownIcon} alt="Crown Icon" className="w-14 sm:w-16" />
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
