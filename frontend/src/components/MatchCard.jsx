import CrownIcon from "../assets/CrownIcon.svg";
import VS from "./VS.jsx";
import { AvatarCircle } from "./AvatarCircle.jsx";
import InfoMatchBox from "./InfoMatchBox.jsx";
import { MatchText } from "./Text.jsx";
import { useState } from "preact/hooks";
import { ButtonScore } from "./PlayerScore.jsx";
import { PlayerScore } from "./PlayerScore.jsx";
import { SubmitScore } from "./PlayerScore.jsx";
import CountdownTimer from "./CountdownTimer";

export function MatchCard({ match }) {
  // setear phase dependiendo del status
  const phaseMap = {
    1: Phase1,
    2: Phase2,
    3: Phase3,
    4: Phase4,
    5: Phase5,
  };

  const getStatusNumber = (status) => {
    const statusMap = {
      scheduled: 1,
      // "set result": 2,
      pending: 3,
      reported: 4,
      confirmed: 5,
    };
    return statusMap[status] || 0;
  };

  // pija.... "pija es el match pero con un nombre mas lindo" -Copilot
  const pija = {
    matchID: match._id,
    competition: match.competition,
    player1: match.players[0],
    player2: match.players[1],
    targetDate: match.date,
    status: match.status,
  };

  const [phaseNumber, setPhaseNumber] = useState(getStatusNumber(match.status));
  const PhaseComponent = phaseMap[phaseNumber] || null;

  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      <PhaseComponent match={pija} pija={match} />
    </div>
  );
}

// fase1, la fase relacionada con el status "scheduled"
function Phase1({ match, pija }) {
  const [showPhase2, setShowPhase2] = useState(false);

  const togglePhase2 = () => {
    setShowPhase2(!showPhase2);
  };

  return (
    <div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      <div
        className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]"
        onClick={togglePhase2}
      >
        {/* Player 1 Side */}
        <div
          className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-white"
          style={{ WebkitTextStroke: "1px black", color: "white" }}
        >
          <AvatarCircle player={match.player1} />
          <MatchText player={match.player1} />
        </div>
        {/* VS Section */}
        <VS />
        {/* Space between blue and red */}
        <div className="w-1"></div>
        {/* Player 2 Side */}
        <div className="flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
          <MatchText player={match.player2} />
          <AvatarCircle player={match.player2} />
        </div>
      </div>
      {/* Time Left Container */}
      {match.targetDate && !showPhase2 && (
        <InfoMatchBox>
          Time left: <CountdownTimer targetDate={match.targetDate} />
        </InfoMatchBox>
      )}
      <div
        className={`animation-opacity ${
          showPhase2
            ? "z-10 opacity-100 animate-slide-in-top absolute bottom-10 left-1/2 transform mb-4"
            : "z-0 opacity-0 animate-slide-out-bottom absolute bottom-10 left-1/2 transform mb-4"
        }`}
      >
        <Phase2 match={match} pija={pija} />
      </div>
    </div>
  );
}

// fase2..... la fase del submit.... esta horrible y funciona como el orto (la matchcard)
// pero el submit funciona fenomenal
function Phase2({ match, pija }) {
  const [result, setResult] = useState({
    blue: pija.players[0].score,
    red: pija.players[1].score,
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
    <div className="absolute transform -translate-x-[35%] mb-4">
      {/* Controles de puntuación */}
      <div className="flex justify-center items-center mt-1 sm:mt-2 gap-1">
        {/* Player 1 Score */}
        <div className="flex items-center bg-accent-blue-light p-1 md:p2 rounded">
          <ButtonScore
            Sign="-"
            Operation={decreaseBlue}
            color="blue"
            effect="ocean"
          />
          <ButtonScore
            Sign="+"
            Operation={increaseBlue}
            color="red"
            effect="light-dark"
          />
          <PlayerScore score={result.blue} />
          <PlayerScore score={result.red} />
          <ButtonScore
            Sign="-"
            Operation={decreaseRed}
            color="blue"
            effect="ocean"
          />
          <ButtonScore
            Sign="+"
            Operation={increaseRed}
            color="red"
            effect="light-dark"
          />
        </div>

        {/* Submit score */}
        <SubmitScore
          text="SUBMIT"
          match={pija}
          blue={result.blue}
          red={result.red}
        />
      </div>
    </div>
  );
}
// la fase3 es la de totototototootototottony, costo pero se pudo (grande tony tkm <3).
// muestra el boton de accept or deny
function Phase3({ match }) {
  return (
    <div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        {/* Blue Card */}
        <div className="relative flex items-center justify-between bg-accent-blue-light w-5/12 px-3 py-2 text-black">
          {/* Blue image */}
          <div className="flex items-center justify-center w-full">
            <img
              src={match.player1.image}
              alt={match.player1.name}
              className="w-12 sm:w-14 rounded-full skew-x-[8deg] border-2 border-black mr-4"
            />
          </div>

          {/* Blue score */}
          <div className="absolute sm:right-4 right-2 top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 skew-x-[8deg] sm:w-7 sm:h-8 flex items-center justify-center">
            <span className="font-bold text-sm sm:text-lg skew-x-[8deg]">
              {match.player1.score}
            </span>
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
            <span className="font-bold text-sm sm:text-lg skew-x-[8deg]">
              {match.player2.score}
            </span>{" "}
          </div>
          {/* Red image */}
          <div className="flex items-center justify-center w-full">
            <img
              src={match.player2.image}
              alt={match.player2.name}
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
function Phase4({ match }) {
  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      {/* Player 1 Side */}
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        <div className="relative flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
          <AvatarCircle player={match.player1} />
          <MatchText player={match.player1} />
          <PlayerScore score={match.player1.score} />
        </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Player 2 Side */}
        <div className="relative flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
          <PlayerScore score={match.player2.score} />
          <MatchText player={match.player2} />
          <AvatarCircle player={match.player2} />
        </div>
      </div>

      {/* Time Left Container */}
      <InfoMatchBox children="WAITING" />
    </div>
  );
}

// fase5, alta fase pa, te muestra que ganaste
function Phase5({ match }) {
  const blueCardSize =
    match.player1.score > match.player2.score ? "w-9/12" : "w-5/12";
  const redCardSize =
    match.player2.score > match.player1.score ? "w-9/12" : "w-5/12";
  const crownPosition =
    match.player1.score > match.player2.score ? "right-[80%]" : "right-[20%]";
  const blueImagePosition =
    match.player1.score > match.player2.score ? "right-[55%]" : "right-[82%]";
  const redImagePosition =
    match.player1.score < match.player2.score ? "left-[45%]" : "left-[72%]";

  return (
    <div className="relative flex w-full max-w-4xl h-28 overflow-visible bg-invisible">
      {/* Card Body */}
      <div className="relative flex w-full h-14 sm:h-16 m-2 -skew-x-[8deg]">
        {/* Blue card */}
        <div
          className={`relative flex items-center justify-between bg-accent-blue-light ${blueCardSize} px-3 py-2 text-black`}
        >
          {/* Blue score */}
          <div
            className="absolute sm:right-4 skew-x-[8deg] right-2 top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <span className="font-bold text-sm sm:text-lg">
              {match.player1.score}
            </span>{" "}
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
            className="absolute sm:left-4 left-2 skew-x-[8deg] top-1/2 -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <span className="font-bold text-sm sm:text-lg">
              {match.player2.score}
            </span>{" "}
          </div>
        </div>

        {/* Player Images */}
        <div className="flex items-center">
          <img
            src={match.player1.image}
            alt={match.player1.name}
            className={`absolute ${blueImagePosition} skew-x-[8deg] translate-x-1/2 w-12 sm:w-14 rounded-full border-2 border-black mr-3`}
          />
          <img
            src={match.player2.image}
            alt={match.player2.name}
            className={`absolute ${redImagePosition} skew-x-[8deg] translate-x-1/2 w-12 sm:w-14 rounded-full border-2 border-black`}
          />
        </div>

        {/* Crown Icon */}
        <div
          className={`absolute ${crownPosition} translate-x-[50%] skew-x-[8deg] flex justify-center w-1/3`}
        >
          <img src={CrownIcon} alt="Crown Icon" className="w-14 sm:w-16" />
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
