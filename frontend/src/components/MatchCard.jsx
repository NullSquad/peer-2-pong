import CrownIcon from "../assets/CrownIcon.svg";
import BaseCard from "./BaseCard.jsx";
import VS from "./VS.jsx";
import { AvatarCircle } from "./AvatarCircle.jsx";
import InfoMatchBox from "./InfoMatchBox.jsx";
import { MatchText } from "./Text.jsx";
import { useState } from "preact/hooks";
import { SignScore } from "./PlayerScore.jsx";
import { ButtonScore } from "./PlayerScore.jsx";
import { PlayerScore } from "./PlayerScore.jsx";
import { SubmitScore } from "./PlayerScore.jsx";
import CountdownTimer from "./CountdownTimer";

export function MatchCard({ player1, player2, targetDate, state }) {
  const [phase, setPhase] = useState(state === 1 ? 1 : state + 1);
  const [result1, setResult1] = useState({ blue: 0, red: 0 });

  const togglePhase = () => setPhase((prev) => (prev === 1 ? 2 : 1));
  const setPhase4 = () => setPhase(4);

  return (
    <div className="relative flex flex-col w-full max-w-4xl overflow-visible bg-invisible">
      {(phase === 1 || phase === 2) && <button onClick={togglePhase}>
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
        {phase === 2 && (
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
      {phase === 3 && (
        <Phase4
          player1={player1}
          player2={player2}
          result={result1}
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
	  <div>
      {phase === 5 && (
        <Phase4
          player1={player1}
          player2={player2}
          result={result1}
        />
      )}
      </div>
    </div>
  );
}

function Phase1({ player1, player2, targetDate }) {
  return (
      <div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
        <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
          {/* Player 1 Side */}
          <div className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
      		<AvatarCircle player={player1}/>      
	  		<MatchText player={player1}/>
          </div>
          {/* VS Section */}  
	  		< VS />
          {/* Space between blue and red */}
          <div className="w-1"></div>

          {/* Player 2 Side */}
          <div className="flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
	  		<MatchText player={player2}/>
      		<AvatarCircle player={player2}/>      
          </div>
        </div>
        
        {/* Time Left Container */}
        {targetDate && 
			(
			<InfoMatchBox>
				Time left: <CountdownTimer targetDate={targetDate}/>
			</InfoMatchBox>
			)
		}
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

      {/* Player 1 Score */}
        <div className="flex items-center bg-accent-blue-light p-1 md:p2 rounded">
    	<ButtonScore Sign="-" Operation={decreaseBlue} result={result} setResult={setResult} color="blue" effect="ocean"/>
    	<ButtonScore Sign="+" Operation={increaseBlue} result={result} setResult={setResult} color="red" effect="light-dark"/>
         <PlayerScore score={result.blue}/> 
        </div>

      {/* Player 2 Score */}
        <div className="flex items-center bg-red-500 p-1  rounded">
         <PlayerScore score={result.red}/> 
    	<ButtonScore Sign="-" Operation={decreaseRed} result={result} setResult={setResult} color="blue" effect="ocean"/>
    	<ButtonScore Sign="+" Operation={increaseRed} result={result} setResult={setResult} color="red" effect="light-dark"/>
        </div>

        {/* Submit score */}
	  <SubmitScore text="SUBMIT" setPhase={setPhase}/>	
      </div>
    </div>
  );
}

function Phase3({player1, player2, result}) {
	return (
		<div className="flex w-full max-w-full h-[128px] sm:h-[128px] md:h-28 overflow-hidden bg-invisible">
		  <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
			{/* Blue Card */}
			<div className="flex items-center justify-center bg-accent-blue-light flex-1 p-3 text-black">
			  {/* Image inside the blue card */}
      		<AvatarCircle player={player1}/>      
			  {/* Counted blue score */}
			  <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center ml-2">
				{result.blue}
			  </div>
			</div>
			{/* Space between blue and red */}
			<div className="w-1"></div>

			{/* Red Card */}
			<div className="flex items-center justify-center bg-red-500 flex-[1.8] p-3 text-black">

			  {/* Counted red score */}
			  <div className="bg-black text-white p-1 px-2 rounded w-6 h-7 sm:w-7 sm:h-8 flex items-center justify-center mr-2">
				{result.red}
			  </div>

			  {/* Buttons container */}
			  <div className="flex relative left-[12rem] items-center justify-center skew-x-[8deg] ml-3">
				<button className="bg-accent-blue shadow-blue-light-dark border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]">
				  <span className="inline-block relative top-[-1px] skew-x-[8deg] sm:top-[-2px] leading-none skew-x-[5deg]" style={{ textShadow: "1px 1px 0px black" }}>✓</span>
				</button>
				<button className="bg-accent-red shadow-red-light-dark border-2 border-black w-8 h-6 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]">
				  <span className="inline-block relative top-[-1px] sm:top-[-2px] skew-x-[8deg] leading-none skew-x-[5deg]" style={{ textShadow: "1px 1px 0px black" }}>X</span>
				</button>
			  </div>
			  {/* Image inside the red card */}
      		<AvatarCircle player={player2}/>      
			</div>
		  </div>
		</div>
	  );
	}

function Phase4({ player1, player2, result }) {
  return (
    <div className="relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
    {/* Player 1 Side */}
      <div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
        <div className="relative flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
		<AvatarCircle player={player1}/>      
	  	<MatchText player={player1}/>
	  <div className="absolute z-10 inset-y-4 right-0"> 
         <PlayerScore score={result.blue}/> 
	  </div> 
      </div>

        {/* Space between blue and red */}
        <div className="w-1"></div>

        {/* Player 2 Side */}
        <div className="relative flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
	  <div className="absolute z-10 inset-y-4 left-2"> 
        <PlayerScore score={result.red}/> 
	  </div> 
	  	<MatchText player={player2}/>
		<AvatarCircle player={player2}/>      
        </div>
      </div>

      {/* Time Left Container */}
	  <InfoMatchBox children="WAITING"/>
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
