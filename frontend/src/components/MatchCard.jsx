import CrownIcon from "../assets/CrownIcon.svg";
import { useState } from "preact/hooks";
import CountdownTimer from "./CountdownTimer";

export function MatchCard({ player1, player2, targetDate }) {
  const [phase, setPhase] = useState(1);
  const [result1, setResult1] = useState({ blue: 0, red: 0 });

  const togglePhase = () => setPhase((prev) => (prev === 1 ? 2 : 1));
  const setPhase4 = () => setPhase(4);

  return (
    <div className="relative flex flex-col w-full max-w-4xl overflow-visible bg-invisible">
      {phase != 4 && <button onClick={togglePhase}>
        <Phase1
          player1={player1}
          player2={player2}
          targetDate={phase === 1 ? targetDate : ""}
        />
      </button>}
      <div
        className={` animation-opacity ${
          phase === 2 
            ? "z-10 opacity-100 animate-slide-out-bottom animate-delay-100 "
            : "z-0 opacity-0 animate-slide-in-bottom transition-opacity ease-out delay-200 duration-200"
        }`}
      >
        {phase != 4 && (
          <Phase2
            player1={player1}
            player2={player2}
            result={result1}
            setResult={setResult1}
            setPhase={setPhase4}
          />
        )}
      </div>
      <div>
      {phase === 4 && (
        <Phase4
          player1={player1}
          player2={player2}
          result={result1}
        />
      )}
      </div>
      <Phase3
        player1={player1}
        player2={player2}
        result={result1}
    />
    </div>
  );
}

function Phase1({ player1, player2, targetDate }) {
  return (
    <>
      <div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
        {/* Card Body with clip-path */}
        <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
          {/* Player 1 Side */}
          <div className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
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
      </div>
    </>
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
          onClick={setPhase}
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
    </div>
  );
}


function Phase3({ player1, player2, result }) {
  return (
    <div className="flex w-full max-w-full h-[128px] sm:h-[128px] md:h-28 overflow-hidden bg-invisible">
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        {/* Blue Card */}
        <div className="flex items-center justify-center bg-accent-blue-light flex-1 text-black grid grid-cols-2 gap-4 px-3 py-2"> {/* si quieren que la tarjeta azul sea mas grande, anadir px-3 py-2 despues del flex-1 antes del text-black*/}
          {/* Image inside the blue card */}
          <img 
            src={player1.image}
            alt={player1.name}
            className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black col-start-1 -mt-1 ml-36"    
          />  {/* ml-20 para mover la imagen a la izquierda */}

          {/* Counted blue score */}
          <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center col-start-3 mt-1 ml-24">
            {result.blue}
          </div>
        </div>
        
        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Red Card (using grid layout) */}
        <div className="bg-red-500 flex-[1.8] p-3 text-black grid grid-cols-3 grid-rows-3 gap-2">
          {/* Counted red score */}
          <div className="col-start-1 row-start-1 bg-black text-white p-1 px-2 rounded w-6 h-8 sm:w-7 sm:h-8 flex items-center justify-center mt-2">
            {result.red}
          </div>

          {/* Image inside the red card */}
          <img
            src={player2.image}
            alt={player2.name}
            className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black mr-2 -mt-2"
          />
          
          {/* Buttons container (placing it in the last row) */}
          <div className="col-start-3 col-span-3 row-start-1 flex justify-center space-x-2">
            <button className="bg-accent-blue shadow-blue-ocean border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]">
              <span className="inline-block relative top-[-1px] skew-x-[8deg] sm:top-[-2px] leading-none skew-x-[5deg]" style={{ textShadow: "1px 1px 0px black" }}>✓</span>
            </button>
            <button className="bg-accent-red shadow-red-light-dark border-2 border-black w-8 h-6 sm:w-9 sm:h-7 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]">
              <span className="inline-block relative top-[-1px] sm:top-[-2px] skew-x-[8deg] leading-none skew-x-[5deg]" style={{ textShadow: "1px 1px 0px black" }}>X</span>
            </button>
          </div>

          {/* Question mark below buttons */}
          <div className="col-start-3 col-span-3 row-start-3 flex justify-center -mt-1">
            <span className="ext-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl inline-block whitespace-nowrap skew-x-[8deg] font-lilita-one">
              Accept score?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phase4({ player1, player2, result }) {
  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      {/* Card Body with clip-path */}
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        {/* Player 1 Side */}
        <div className="relative flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
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
        WAITING
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
