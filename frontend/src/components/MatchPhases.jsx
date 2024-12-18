import CrownIcon from "../assets/CrownIcon.svg";
import VS from "./VS.jsx";
import { AvatarCircle } from "./AvatarCircle.jsx";
import InfoMatchBox from "./InfoMatchBox.jsx";
import { MatchText } from "./Text.jsx";
import { ButtonScore } from "./PlayerScore.jsx";
import { PlayerScore } from "./PlayerScore.jsx";
import { SubmitScore } from "./PlayerScore.jsx";
import CountdownTimer from "./CountdownTimer";
import { useState } from "preact/hooks";
import BaseCard from "./BaseCard.jsx";

// fase1, la fase relacionada con el status "scheduled"
export function Phase1({ match, refresh }) {
  const [showPhase2, setShowPhase2] = useState(false);

  const togglePhase2 = () => {
    setShowPhase2(!showPhase2);
  };

  const showTimeLeft = match.date && !showPhase2;

  return (
    <div className="relative flex flex-col w-full overflow-visible bg-invisible">
      <div
        className="relative flex w-full h-[75%] -skew-x-[8deg]"
        onClick={togglePhase2}
      >
        {/* Player 1 Side */}
        <div
          className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-white"
          style={{ WebkitTextStroke: "1px black", color: "white" }}
        >
          <AvatarCircle player={match.players[0]} />
          <MatchText player={match.players[0]} />
        </div>
        {/* VS Section */}
        <VS />
        {/* Space between blue and red */}
        <div className="w-1"></div>
        {/* Player 2 Side */}
        <div className="flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
          <MatchText player={match.players[1]} />
          <AvatarCircle player={match.players[1]} />
        </div>
      </div>
      {/* Time Left Container */}
      {showTimeLeft && (
        <InfoMatchBox>
          Time left: <CountdownTimer targetDate={match.date} />
        </InfoMatchBox>
      )}
      <div
        className={`animation-opacity ${
          showPhase2
            ? "z-10 opacity-100 animate-slide-in-top absolute bottom-10 left-1/2 transform mb-[6px] sm:mb-[7px] md:mb-[4px]"
            : "z-0 opacity-0 animate-slide-out-bottom absolute bottom-10 left-1/2 transform mb-[6px] sm:mb-[7px] md:mb-[4px]"
        }`}
      >
        <Phase2 match={match} refresh={refresh} />
      </div>
    </div>
  );
}

// fase2..... la fase del submit.... esta horrible y funciona como el orto (la matchcard)
// pero el submit funciona fenomenal
export function Phase2({ match, refresh }) {
  const [result, setResult] = useState({
    blue: match.players[0].score,
    red: match.players[1].score,
  });

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
    setResult((prevResult) => ({
      ...prevResult,
      blue: Math.max(0, prevResult.blue - 1),
    }));
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
    setResult((prevResult) => ({
      ...prevResult,
      red: Math.max(0, prevResult.red - 1),
    }));
  };

  const isValidResult = () => {
    if (result.blue === result.red || (result.blue < 11 && result.red < 11)) {
      return false;
    }

    if (
      Math.abs(result.blue - result.red) >= 2 &&
      (result.blue > 10 || result.red > 10)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="absolute h-[20%] -translate-x-[33%] sm:-translate-x-[35%]">
      {/* Controles de puntuación */}
      <div className="flex justify-center items-center mt-8 sm:mt-[1.45rem] md:mt-4 gap-1">
        {/* Player 1 Score */}
        <div className="flex items-center p-[0.1rem] sm:p-1 rounded">
          <ButtonScore
            Sign="-"
            Operation={decreaseBlue}
            color="bg-accent-blue-button"
            effect="shadow-blue"
          />
          <ButtonScore
            Sign="+"
            Operation={increaseBlue}
            color="bg-accent-red-button"
            effect="shadow-red"
          />
          <PlayerScore score={result.blue} mr="mr-1" />
          <PlayerScore score={result.red} mr="mr-1" />
          <ButtonScore
            Sign="-"
            Operation={decreaseRed}
            color="bg-accent-blue-button"
            effect="shadow-blue"
          />
          <ButtonScore
            Sign="+"
            Operation={increaseRed}
            color="bg-accent-red-button"
            effect="shadow-red"
          />
        </div>

        {/* Submit score */}
        <SubmitScore
          text="SUBMIT"
          match={match}
          refresh={refresh}
          blue={result.blue}
          red={result.red}
        />
      </div>
    </div>
  );
}
// la fase3 es la de totototototootototottony, costo pero se pudo (grande tony tkm <3).
// muestra el boton de accept or deny
export function Phase3({ match }) {
  return (
    <div className="z-10 relative flex w-full overflow-visible bg-invisible">
      <div className="relative flex w-full h-[75%] -skew-x-[8deg]">
        {/* Blue Card */}
        <div className="relative flex items-center justify-between bg-accent-blue-light w-5/12 px-3 py-2 text-black">
          {/* Blue image */}
          <div className="flex items-center justify-center w-full">
            <img
              src={match.players[0].image}
              alt={match.players[0].name}
              className="w-12 sm:w-14 rounded-full skew-x-[8deg] border-2 border-black mr-4"
            />
          </div>

          {/* Blue score */}
          <PlayerScore score={match.players[0].score} skew="skew-x-[8deg]" />
        </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Red Card */}
        <div className="relative flex items-center justify-between bg-red-500 w-9/12 px-3 py-2 text-black">
          {/* Red score */}
          <PlayerScore score={match.players[1].score} skew="skew-x-[8deg]" />
          {/* Red image */}
          <div className="flex items-center justify-center w-full">
            <img
              src={match.players[1].image}
              alt={match.players[1].name}
              className="w-12 sm:w-14 rounded-full skew-x-[8deg] border-2 border-black ml-4"
            />
          </div>

          {/* Buttons container */}
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            {/* Buttons */}
            <div className="flex items-center">
              {/* Accept Button */}
              <button
                onClick={() => confirmMatch(match._id, true)}
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
                onClick={() => confirmMatch(match._id, false)}
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
    </div>
  );
}

// fase 4, fase picada, relacionada con el status pending
export function Phase4({ match }) {
  return (
    <div className="z-10 relative flex flex-col w-full overflow-visible bg-invisible">
      <div className="relative flex w-full h-[75%] -skew-x-[8deg]">
		{/* Player 1 Side */}
        <div className="relative grid grid-cols-[1fr_auto] items-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
		  <div className="flex justify-center items-center">
            <MatchText player={match.players[0]} />
            <AvatarCircle player={match.players[0]} />
		  </div>
		  <div classname="flex items-center">
		    <PlayerScore score={match.players[0].score} skew="skew-x-[8deg]" />
		  </div>
        </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Player 2 Side */}
        <div className="relative grid grid-cols-[auto_1fr] items-center bg-red-500 w-1/2 px-3 py-2 text-black">
          <div classname="flex items-center">
		    <PlayerScore score={match.players[1].score} skew="skew-x-[8deg]" />
		  </div>
		  <div className="flex justify-center items-center">
            <MatchText player={match.players[1]} />
            <AvatarCircle player={match.players[1]} />
		  </div>
        </div>
      </div>

      {/* Time Left Container */}
      <InfoMatchBox children="Waiting confirmation..." />
    </div>
  );
}

// fase5, alta fase pa, te muestra que ganaste
export function Phase5({ match }) {
  const blueCardSize =
    match.players[0].score > match.players[1].score ? "w-9/12" : "w-5/12";
  const redCardSize =
    match.players[1].score > match.players[0].score ? "w-9/12" : "w-5/12";
  const crownPosition =
    match.players[0].score > match.players[1].score
      ? "right-[80%]"
      : "right-[20%]";
  const blueImagePosition =
    match.players[0].score > match.players[1].score
      ? "right-[55%]"
      : "right-[82%]";
  const redImagePosition =
    match.players[0].score < match.players[1].score
      ? "left-[45%]"
      : "left-[72%]";

  return (
    <div className="z-10 relative flex w-full overflow-visible bg-invisible">
      <div className="relative flex w-full h-[75%] -skew-x-[8deg]">
        {/* Blue card */}
        <div
          className={`relative flex items-center justify-between bg-accent-blue-light ${blueCardSize} px-3 py-2 text-black`}
        >
          {/* Blue score */}
          <div
            className="absolute sm:right-4 skew-x-[8deg] right-2 top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-5 h-6 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <PlayerScore score={match.players[0].score} />
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
            className="absolute sm:left-4 left-2 skew-x-[8deg] top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-5 h-6 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <PlayerScore score={match.players[1].score} />
          </div>
        </div>

        {/* Player Images */}
        <div className="flex items-center">
          <img
            src={match.players[0].image}
            alt={match.players[0].name}
            className={`absolute ${blueImagePosition} skew-x-[8deg] translate-x-1/2 w-12 sm:w-14 rounded-full border-2 border-black mr-3`}
          />
          <img
            src={match.players[1].image}
            alt={match.players[1].name}
            className={`absolute ${redImagePosition} skew-x-[8deg] translate-x-1/2 w-12 sm:w-14 rounded-full border-2 border-black`}
          />
        </div>

        {/* Crown Icon */}
        <div
          className={`absolute ${crownPosition} translate-x-[50%] skew-x-[8deg] flex justify-center w-1/3`}
        >
          <img src={CrownIcon} alt="Crown Icon" className="w-12 sm:w-16" />
        </div>
      </div>
    </div>
  );
}
