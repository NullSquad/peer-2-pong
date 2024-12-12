import CrownIcon from "../assets/CrownIcon.svg";
import BaseCard from "./BaseCard.jsx"
import VS from "./VS.jsx"
import { useState } from "preact/hooks";
import CountdownTimer from "./CountdownTimer";

export function MatchCard({ player1, player2, targetDate, status, score1, score2, matchID }) {
  const phaseMap = {
    1: Phase1,
    2: Phase1,
    3: Phase3,
    4: Phase4,
    5: Phase5,
  };

  const getStatusNumber = (status) => {
    const statusMap = {
      "scheduled": 1,
      // "set result": 2,
      "pending": 3,
      "reported": 4,
      "confirmed": 5,
    };
    return statusMap[status] || 0;
  };

  const [phaseNumber, setPhaseNumber] = useState(getStatusNumber(status));
  const PhaseComponent = phaseMap[phaseNumber] || null; 
  const [result, setResult] = useState({ blue: score1, red: score2 });

  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      <PhaseComponent player1={player1} player2={player2} 
                      targetDate={targetDate} status={status}
                      matchID={matchID}
                      result={result} setResult={setResult} setPhase={setPhaseNumber}
      />
    </div>
  );
}

function Phase1({ player1, player2, targetDate, setResult, status, result, setPhase, matchID }) {
  
  const increaseBlue = () => {
    setResult((prevResult) => {
      const newBlue = prevResult.blue + 1;

      if (prevResult.red < 10) {
        if (newBlue <= 11) {
          return { ...prevResult, blue: newBlue };
        }
      } else {
        if (newBlue - prevResult.red <= 2) {
          return { ...prevResult, blue: newBlue };
        }
      }

      return prevResult;
    });
  };

  const decreaseBlue = () => {
    setResult((prevResult) => ({ ...prevResult, blue: Math.max(0, prevResult.blue - 1) }));
  };

  const increaseRed = () => {
    setResult((prevResult) => {
      const newRed = prevResult.red + 1;

      if (prevResult.blue < 10) {
        if (newRed <= 11) {
          return { ...prevResult, red: newRed };
        }
      } else {
        if (newRed - prevResult.blue <= 2) {
          return { ...prevResult, red: newRed };
        }
      }

      return prevResult;
    });
  };

  const decreaseRed = () => {
    setResult((prevResult) => ({ ...prevResult, red: Math.max(0, prevResult.red - 1) }));
  };

  const isValidResult = () => {
    if (result.blue === result.red || (result.blue < 11 && result.red < 11)) {
      return false;
    }

    if (Math.abs(result.blue - result.red) >= 2 && (result.blue > 10 || result.red > 10)) {
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    const data = {
      player1: result.blue,
      player2: result.red,
      matchID: matchID
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST', //or patch
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Match result uploaded successfully');
      } else {
        console.error('Failed to upload match result');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
        <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
          {/* Player 1 Side */}
          <div className="flex items-center justify-center bg-accent-blue w-1/2 px-3 py-2 text-black">
            <img
              src={player1.image}
              alt={player1.name}
              className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black mr-2"
            />
            <span className="text-sm md:text-lg font-bold skew-x-[8deg]">
              {player1.name}
            </span>
          </div>

          {/* VS Section */}
          <div
            className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl font-extrabold"
            style={{
              textShadow: "2px 2px 4px black",
            }}
          >
            VS
          </div>

          {/* Space between blue and red */}
          <div className="w-1"></div>

          {/* Player 2 Side */}
          <div className="flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
            <span className="text-sm md:text-lg skew-x-[8deg] font-bold mr-2">
              {player2.name}
            </span>
            <img
              src={player2.image}
              alt={player2.name}
              className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black"
            />
          </div>
        </div>

        {/* Time Left Container */}
        {targetDate && (
          <div
            className="absolute right-2 bottom-[5px] sm:bottom-[2px] md:right-[26px] md:bottom-[12px] bg-gray-900 text-white text-xs sm:text-sm md:text-sm p-1 md:p-2 rounded-lg z-10"
            style={{
              width: "max-content",
            }}
          >
            Time left: <CountdownTimer targetDate={targetDate} />
          </div>
        )}

        {/* Phase2 xdxddxddxxddx*/}
      { status === "set result" &&

      <div className="relative bottom-[3.7rem] left-[3rem] md:bottom-[5rem]">
        {/* Controles de puntuación */}
        <div className="flex justify-center items-center mt-1 sm:mt-2 gap-1">
          <div className="flex items-center bg-accent-blue-light p-1 md:p2 rounded">
            {/* Decrease blue score*/}
            <button
              onClick={decreaseBlue}
              className="bg-accent-red shadow-red-light-dark border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
            >
              <span
                className="inline-block relative top-[-1px] sm:top-[-2px] leading-none skew-x-[5deg]"
                style={{
                  textShadow: "1px 1px 0px black",
                }}
              >
                -
              </span>
            </button>
            {/* Increase blue score */}
            <button
              onClick={increaseBlue}
              className="bg-accent-blue shadow-blue-ocean border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
            >
              <span
                className="inline-block relative leading-none skew-x-[5deg]"
                style={{
                  textShadow: "1px 1px 0px black",
                }}
              >
                +
              </span>
            </button>
            {/* Blue score */}
            <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center ml-2">
              <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">
                {result.blue}
              </span>
            </div>
          </div>
          <div className="flex items-center bg-red-500 p-1  rounded">
            {/* Red score */}
            <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">
                {result.red}
              </span>
            </div>
            {/* Decrease red score*/}
            <button
              onClick={decreaseRed}
              className="bg-accent-red shadow-red-light-dark border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
            >
              <span
                className="inline-block relative top-[-1px] sm:top-[-2px] leading-none skew-x-[5deg]"
                style={{
                  textShadow: "1px 1px 0px black",
                }}
              >
                -
              </span>
            </button>
            {/* Increase red score */}
            <button
              onClick={increaseRed}
              className="bg-accent-blue shadow-blue-ocean border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
            >
              <span
                className="inline-block relative leading-none skew-x-[5deg]"
                style={{
                  textShadow: "1px 1px 0px black",
                }}
              >
                +
              </span>
            </button>
          </div>
          {/* Submit score */}
          <button
                onClick={ (result, matchID) => {
                  if (isValidResult(result.blue, result.red)){
                    handleSubmit();
                  }
                }
              }
            className="bg-yellow-500 shadow-yellow-50-700-sm text-white font-bold  text-md md:text-xl font-lilita-one border-2 border-black mr-9 sm:mr-1 w-16  h-7 sm:w-24 sm:h-8 text-sm sm:text-xl -skew-x-[8deg] rounded-lg relative active:translate-y-[2px]"
          >
            <span
              className="inline-block skew-x-[8deg]"
              style={{
                WebkitTextStroke: "1px black",
                WebkitTextFillColor: "white",
              }}
            >
              SUBMIT
            </span>
          </button>
        </div>
      </div> }
      </div>
  );
}

function Phase2({ result, setResult, setPhase }) {
  const increaseBlue = () => setResult({ ...result, blue: result.blue + 1 });
  const decreaseBlue = () =>
    setResult({ ...result, blue: Math.max(0, result.blue - 1) });

  const increaseRed = () => setResult({ ...result, red: result.red + 1 });
  const decreaseRed = () =>
    setResult({ ...result, red: Math.max(0, result.red - 1) });

  return (
    <div className="relative bottom-[3.7rem] left-[3rem] md:bottom-[5rem]">
      {/* Controles de puntuación */}
      <div className="flex justify-center items-center mt-1 sm:mt-2 gap-1">
        <div className="flex items-center bg-accent-blue p-1 md:p2 rounded">
          {/* Decrease blue score*/}
          <button
            onClick={decreaseBlue}
            className="bg-accent-blue-button shadow-blue border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
          >
            <span
              className="inline-block relative top-[-1px] sm:top-[-2px] leading-none skew-x-[5deg]"
              style={{
                textShadow: "1px 1px 0px black",
              }}
            >
              -
            </span>
          </button>
          {/* Increase blue score */}
          <button
            onClick={increaseBlue}
            className="bg-accent-red-button shadow-red border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
          >
            <span
              className="inline-block relative leading-none skew-x-[5deg]"
              style={{
                textShadow: "1px 1px 0px black",
              }}
            >
              +
            </span>
          </button>
          {/* Blue score */}
          <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center ml-2">
            <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">
              {result.blue}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-red-500 p-1  rounded">
          {/* Red score */}
          <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center mr-2">
            <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">
              {result.red}
            </span>
          </div>
          {/* Decrease red score*/}
          <button
            onClick={decreaseRed}
            className="bg-accent-blue-button shadow-blue border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
          >
            <span
              className="inline-block relative top-[-1px] sm:top-[-2px] leading-none skew-x-[5deg]"
              style={{
                textShadow: "1px 1px 0px black",
              }}
            >
              -
            </span>
          </button>
          {/* Increase red score */}
          <button
            onClick={increaseRed}
            className="bg-accent-red-button shadow-red border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]"
          >
            <span
              className="inline-block relative leading-none skew-x-[5deg]"
              style={{
                textShadow: "1px 1px 0px black",
              }}
            >
              +
            </span>
          </button>
        </div>
        {/* Submit score */}
        <button
          onClick={setPhase}
          className="bg-primary-yellow shadow-yellow-50-700-sm text-white font-bold  text-md md:text-xl font-lilita-one border-2 border-black mr-9 sm:mr-1 w-16  h-7 sm:w-24 sm:h-8 text-sm sm:text-xl -skew-x-[8deg] rounded-lg relative active:translate-y-[2px]"
        >
          <span
            className="inline-block skew-x-[8deg]"
            style={{
              WebkitTextStroke: "1px black",
              WebkitTextFillColor: "white",
            }}
          >
            SUBMIT
          </span>
        </button>
      </div>
    </div>
  );
}

function Phase3({ player1, player2, result }) {
	return (
		<div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
			<div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">

				{/* Blue Card */}
				<div className="relative flex items-center justify-between bg-accent-blue w-5/12 px-3 py-2 text-black">

					{/* Blue image */}
					<div className="flex items-center justify-center w-full">
						<img
							src={player1.image}
							alt={player1.name}
							className="w-12 sm:w-14 rounded-full skew-x-[8deg] border-2 border-black mr-4"
						/>
					</div>

					{/* Blue score */}
					<div
						className="absolute sm:right-4 right-2 top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 skew-x-[8deg] sm:w-7 sm:h-8 flex items-center justify-center"
					>
						<span className="font-bold text-sm sm:text-lg skew-x-[8deg]">{result.blue}</span>
					</div>
				</div>

				{/* Space between blue and red */}
				<div className="w-1"></div>

				{/* Red Card */}
				<div className="relative flex items-center justify-between bg-red-500 w-9/12 px-3 py-2 text-black">

					{/* Red score */}
					<div
						className="absolute sm:left-4 left-2 top-1/2 -translate-y-1/2 skew-x-[8deg] bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
					>
						<span className="font-bold text-sm sm:text-lg skew-x-[8deg]">{result.blue}</span>{" "}
					</div>
					{/* Red image */}
					<div className="flex items-center justify-center w-full">
						<img
							src={player1.image}
							alt={player1.name}
							className="w-12 sm:w-14 rounded-full skew-x-[8deg] border-2 border-black ml-4"
						/>
					</div>

					{/* Buttons container */}
					<div className="relative flex flex-col items-center justify-center w-full h-full">
						{/* Buttons */}
						<div className="flex items-center">
							{/* Accept Button */}
							<button
								className="bg-accent-blue-button shadow-blue mr-2 border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mt-1 -mb-1 rounded-md text-white text-sm sm:text-xl font-lilita-one active:translate-y-[1px] flex items-center justify-center"
							>
								<span
									className="inline-block relative leading-none skew-x-[8deg]"
									style={{
										textShadow: "1px 1px 0px black",
									}}
								>
									✓
								</span>
							</button>

							{/* Deny Button */}
							<button
								className="bg-accent-red-button shadow-red border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md mt-1 -mb-1 text-white text-sm sm:text-xl font-lilita-one active:translate-y-[1px] flex items-center justify-center"
							>
								<span
									className="inline-block relative leading-none skew-x-[8deg]"
									style={{
										textShadow: "1px 1px 0px black",
									}}
								>
									X
								</span>
							</button>
						</div>

						{/* Question mark below buttons */}
						<div>
							<span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl inline-block whitespace-nowrap skew-x-[8deg] font-lilita-one">
								Accept score?
							</span>
						</div>
					</div>

				</div>
			</div>
		</div >
	);
}

function Phase4({ player1, player2, result }) {
  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      {/* Card Body with clip-path */}
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        {/* Player 1 Side */}
        <div className="relative flex items-center justify-center bg-accent-blue-light w-5/12 px-3 py-2 text-black">
          <img
            src={player1.image}
            alt={player1.name}
            className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black mr-2"
          />
          <span className="text-sm md:text-lg font-bold skew-x-[8deg]">
            {player1.name}
          </span>
          {/* Score Section for Player 1 */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 skew-x-[8deg] bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center">
            <span className="font-bold text-sm sm:text-lg">{result.blue}</span>
          </div>
        </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Player 2 Side */}
        <div className="relative flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
          {/* Score Section for Player 2 */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 skew-x-[8deg] bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center">
            <span className="font-bold text-sm sm:text-lg">{result.red}</span>
          </div>
          <span className="text-sm md:text-lg skew-x-[8deg] font-bold mr-2">
            {player2.name}
          </span>
          <img
            src={player2.image}
            alt={player2.name}
            className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black"
          />
        </div>
      </div>

      {/* Time Left Container */}
      <div
        className="absolute right-2 bottom-[5px] sm:bottom-[2px] md:right-[26px] md:bottom-[12px] bg-gray-900 text-white text-xs sm:text-sm md:text-sm p-1 md:p-2 rounded-lg z-10"
        style={{
          width: "max-content",
        }}
      >
        Waiting confirmation...
      </div>
    </div>
  );
}

function Phase5({ player1, player2, result }) {
  const blueCardSize = result.blue > result.red ? "w-9/12" : "w-5/12";
  const redCardSize = result.red > result.blue ? "w-9/12" : "w-5/12";
  const crownPosition =
    result.blue > result.red ? "right-[80%]" : "right-[20%]";
  const blueImagePosition =
    result.blue > result.red ? "right-[55%]" : "right-[82%]";
  const redImagePosition =
    result.blue < result.red ? "left-[45%]" : "left-[72%]";

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
