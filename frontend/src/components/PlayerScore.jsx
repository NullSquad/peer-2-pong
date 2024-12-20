import { reportMatch } from "../services/matchesService";

export const SubmitScore = ({ text, match, refresh, blue, red }) => {
  return (
    <button
      onClick={() => {
        match.players[0].score = blue;
        match.players[1].score = red;
        reportMatch(match);
        refresh();
      }}
      className="bg-primary-yellow shadow-yellow-50-700-sm text-white font-bold  text-md md:text-xl font-lilita-one border-2 border-black mr-9 sm:mr-1 w-16 h-6 sm:w-24 sm:h-8 text-sm sm:text-xl -skew-x-[8deg] rounded-lg relative active:translate-y-[2px]"
    >
      <span
        className="inline-block skew-x-[8deg]"
        style={{
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "white",
        }}
      >
        {text}
      </span>
    </button>
  );
};

export const SignScore = ({ Sign }) => {
  const isNegative = Sign === "-";
  return (
    <span
      className={`inline-block relative leading-none skew-x-[5deg] ${
        isNegative ? "top-[-2px] sm:top-[-3px]" : "sm:top-[-1px]"
      }`}
      style={{
        textShadow: "1px 1px 0px black",
      }}
    >
      {Sign}
    </span>
  );
};

export const ButtonScore = ({ Sign, Operation, color, effect }) => {
  return (
    <>
      <button
        onClick={Operation}
        className={`${color} ${effect} border-2 border-black w-6 h-5 sm:w-9 sm:h-7 mr-1 rounded-md text-white text-sm sm:text-xl font-bold font-lilita-one active:translate-y-[1px] flex items-center justify-center -skew-x-[5deg]`}
      >
        <SignScore Sign={Sign} />
      </button>
    </>
  );
};

export const PlayerScore = ({ score, skew, mr }) => {
  return (
    <>
      <div
        className={`bg-black text-white p-1 px-2 rounded w-5 h-6 sm:w-7 sm:h-8 flex items-center ${skew} ${mr} justify-center`}
      >
        <span className="font-bold text-sm skew-x-[8deg] sm:text-lg">
          {score}
        </span>
      </div>
    </>
  );
};
