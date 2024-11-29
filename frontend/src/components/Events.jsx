
import leagueImage from "../../assets/league.svg"
import tournamentImage from "../../assets/tournament.svg"

const League = () => {
  return (
    <div
      className="flex h-full items-center justify-center parallelogram-tuta relative bg-cover bg-center shadow-lg mx-auto
        min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
        md:min-w-[24rem] md:min-h-[14rem]
        lg:min-w-[28rem] lg:min-h-[16rem]"
      style={{
        backgroundImage: `url(${leagueImage})`,
      }}
    >
      {/* Centered Title */}
      <div className="text-white text-center transform -translate-y-14 ">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          LEAGUE
        </h1>
      </div>
    </div>
  );
};

const Tournament = () => {
  return (
    <div
      className="flex h-full items-center justify-center parallelogram-tuta relative bg-cover bg-center shadow-lg mx-auto
        min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
        md:min-w-[24rem] md:min-h-[14rem]
        lg:min-w-[28rem] lg:min-h-[16rem]"
      style={{
        backgroundImage: `url(${tournamentImage})`,
      }}
    >
      {/* Centered Title */}
      <div className="text-white text-center transform -translate-y-14 w-fit ">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">
          TOURNAMENT
        </h1>
      </div>
    </div>
  );
};


const Event = ({ children }) => {
  switch (children?.toUpperCase()) {
    case "LEAGUE":
      return <League />;
    case "TOURNAMENT":
      return <Tournament />;
    default:
      return (
        <div className="bg-red-900 p-4 rounded-lg shadow-lg max-w-sm mx-auto">
          <h1 className="text-white font-bold text-xl text-center">
            Unknown Event
          </h1>
        </div>
      );
  }
};


export default Event;
