import CountdownTimer from "./CountdownTimer";
import CrownIcon from "../assets/CrownIcon.svg";

export function MatchCard({ player1, player2, targetDate, status }) {
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
          {/* Left Section: Players + Scores */}
          <div
            className="flex items-center"
          >

            {/* Player1 Image and Name */}
            <div className="flex items-center px-1 justify-center">
              <img
                src={player1.image}
                alt={player1.name}
                className="w-16 h-16 rounded-full border-2 border-black mr-3"
              />
              <span className="text-sm md:text-lg font-bold">{player1.name}</span>
            </div>
	  		
	  		{/*Scores Section*/}
	  		<div className="flex items-center justify-center bg-black px-4 py-2 rounded-full border-2 border-black">
	  			<span className="text-xl md:text-2xl font-bold">{player1.score}</span>
	  			<span className="mx-2 md:text-2xl font-bold">-</span>
	  			<span className="text-xl md:text-2xl font-bold">{player2.score}</span>
	  		</div>
            
	  		{/* player2 Image and Name */}
			<div className="flex items-center flex-row-reverse px-20">
              <img
                src={player2.image}
                alt={player2.name}
                className="w-16 h-16 rounded-full border-2 border-black mr-3"
              />
              <span className="text-sm md:text-lg font-bold">{player2.name}</span>
            </div>
          </div>

        </div>
        

	  {/* Right Section (if needed, for symmetry or other content) */}
        {/* Space between blue and red */}
        <div className="w-1"></div>

	  	{/*Awaiting Status*/}
	  	{status = "waiting" && (
			<div className="flex items-center justify-center bg-red-500 w-5/12 px-3 py-2 text-black">
			Awaiting validation
			</div>)
	  	}
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
