import CrownIcon from "../assets/CrownIcon.svg";
import { useState } from "preact/hooks";
import CountdownTimer from "./CountdownTimer";

export function MatchCard({ player1, player2, targetDate }) {
  const [phase, setPhase] = useState(1);

  const result = {
    blue: 13,
    red: 11,
  }

  const nextPhase = () => setPhase((prev) => (prev < 5 ? prev + 1 : 1));
  const prevPhase = () => setPhase((prev) => (prev > 1 ? prev - 1 : 5));

  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-gray-800">
      {phase === 1 && (
        <Phase1 player1={player1} player2={player2} targetDate={targetDate} />
      )}
      {phase === 2 && <Phase2 player1={player1} player2={player2} />}
      {phase === 3 && <Phase3 player1={player1} player2={player2} />}
      {phase === 4 && <Phase4 player1={player1} player2={player2} />}
      {phase === 5 && <Phase5 player1={player1} player2={player2} result={result}/>}
      
      <div className="absolute bottom-2 right-64 flex space-x-2">
        <button onClick={prevPhase} className="bg-gray-500 text-white p-2 rounded">
          Prev
        </button>
        <button onClick={nextPhase} className="bg-accent-blue-light text-white p-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
}

function Phase1({ player1, player2, targetDate }) {
  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-gray-800">
      {/* Card Body with clip-path */}
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        {/* Player 1 Side */}
        <div className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
          <img
            src={player1.image}
            alt={player1.name}
            className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black mr-2"
          />
          <span className="text-sm md:text-lg font-bold skew-x-[8deg]">{player1.name}</span>
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
        <div className="flex items-center justify-center bg-accent-red-light w-1/2 px-3 py-2 text-black">
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
        Time left: <CountdownTimer targetDate={targetDate} />
      </div>
    </div>
  );
}

// Fases 2-5, puedes personalizarlas en funciones separadas
function Phase2({ player1, player2, targetDate }) {
  return (
    <div className="w-full">
      <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-gray-800">
        <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
          <div className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
            <img
              src={player1.image}
              alt={player1.name}
              className="w-12 sm:w-14 rounded-full skew-x-[8deg] border-2 border-black mr-2"
            />
            <span className="text-sm md:text-lg skew-x-[8deg] font-bold">{player1.name}</span>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl font-extrabold"
            style={{ textShadow: "2px 2px 4px black" }}
          >
            VS
          </div>

          <div className="w-1"></div>

          <div className="flex items-center justify-center bg-accent-red-light w-1/2 px-3 py-2 text-black">
            <span className="text-sm skew-x-[8deg] md:text-lg font-bold mr-2">
              {player2.name}
            </span>
            <img
              src={player2.image}
              alt={player2.name}
              className="w-12 sm:w-14 skew-x-[8deg] rounded-full border-2 border-black"
            />
          </div>
        </div>
      </div>

      {/* Controles de puntuación */}
      <div className="flex justify-center items-center mt-2 gap-2 parallelogram">
        {/* Player 1 Score Controls */}
        <div className="flex items-center bg-accent-blue-light p-2 rounded">
          <button className="bg-accent-red-light text-white px-2 py-1 rounded font-bold">-</button>
          <span className="text-black text-2xl font-extrabold mx-2">6</span>
          <button className="bg-blue-700 text-white px-2 py-1 rounded font-bold">+</button>
        </div>

        {/* Player 2 Score Controls */}
        <div className="flex items-center bg-red-500 p-2 rounded">
          <button className="bg-accent-blue-light text-white px-2 py-1 rounded font-bold">+</button>
          <span className="text-black text-2xl font-extrabold mx-2">11</span>
          <button className="bg-accent-red-light  text-white px-2 py-1 rounded font-bold">-</button>
        </div>

        {/* Submit Button */}
        <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded shadow-md">SUBMIT</button>
      </div>
    </div>
  );
}

function Phase3() {
  return <div>Fase 3: Confirmación del resultado</div>;
}

function Phase4() {
  return <div>Fase 4: Análisis o resumen</div>;
}

function Phase5({ player1, player2, result }) {
  const blueCardSize = result.blue > result.red ? "w-9/12" : "w-5/12";
  const redCardSize = result.red > result.blue ? "w-9/12" : "w-5/12";
  const crownPosition = result.blue > result.red ? "right-[80%]" : "right-[20%]";
  const blueImagePosition = result.blue > result.red ? "right-[55%]" : "right-[82%]";
  const redImagePosition =result.blue < result.red ? "left-[45%]" : "left-[72%]";

  return (
    <div className="relative flex w-full max-w-4xl h-28 overflow-visible bg-gray-800">
      {/* Card Body */}
      <div className="relative flex w-full h-14 sm:h-16 m-2 -skew-x-[8deg]">
        {/* Blue card */}
        <div
          className={`relative flex items-center justify-between bg-accent-blue-light ${blueCardSize} px-3 py-2 text-black`}
        >
          {/* Blue score */}
          <div
            className="absolute sm:right-4 right-2 top-1/2 skew-x-[8deg] -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">{result.blue}</span>{" "}
          </div>
        </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Red card */}
        <div
          className={`relative flex items-center justify-center ${redCardSize} bg-accent-red-light px-3 py-2 text-black`}
        >
          {/* Red score */}
          <div
            className="absolute sm:left-4 left-2 top-1/2 skew-x-[8deg] -translate-y-1/2 bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center" // absolute right-9"
          >
            <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">{result.red}</span>{" "}
          </div>
        </div>

        {/* Player Images */}
        <div className="flex items-center">
          <img
            src={player1.image}
            alt={player1.name}
            className={`absolute ${blueImagePosition} translate-x-1/2 skew-x-[8deg] w-12 sm:w-14 rounded-full border-2 border-black mr-3`}
          />
          <img
            src={player2.image}
            alt={player2.name}
            className={`absolute ${redImagePosition} translate-x-1/2 skew-x-[8deg] w-12 sm:w-14 rounded-full border-2 border-black`}
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
