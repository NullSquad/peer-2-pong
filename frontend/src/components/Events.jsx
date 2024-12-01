const League = () => {};

const Tournament = ({ children }) => {};

const Event = ({ children }) => {
  switch (children?.toUpperCase()) {
    case "LEAGUE":
      return (
        <section
          className="flex bg-[url('../../assets/league.svg')] h-full items-center justify-center parallelogram-tuta relative bg-cover bg-center shadow-lg mx-auto
          min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
          md:min-w-[24rem] md:min-h-[14rem]
          lg:min-w-[28rem] lg:min-h-[16rem]"
        >
          {/* Centered Title */}
          <div className="text-white text-center transform -translate-y-8 sm:-translate-y-10 md:-translate-y-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              LEAGUE
            </h1>
          </div>
        </section>
      );
    case "TOURNAMENT":
      return (
        <section
          className="flex bg-[url('../../assets/tournament.svg')] h-full items-center justify-center parallelogram-tuta relative bg-cover bg-center shadow-lg mx-auto
          min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
          md:min-w-[24rem] md:min-h-[14rem]
          lg:min-w-[28rem] lg:min-h-[16rem]"
        >
          {/* Centered Title */}
          <div className="text-white text-center transform -translate-y-10 sm:-translate-y-12 md:-translate-y-14 lg:-translate-y-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
              {children}
            </h1>
          </div>
        </section>
      );
    default:
      return (
        <section
          className="flex bg-[url('../../assets/league.svg')] h-full items-center justify-center parallelogram-tuta relative bg-cover bg-center shadow-lg mx-auto
          min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
          md:min-w-[24rem] md:min-h-[14rem]
          lg:min-w-[28rem] lg:min-h-[16rem]"
        >
          {/* Centered Title */}
          <div className="text-white text-center transform -translate-y-8 sm:-translate-y-10 md:-translate-y-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              {children}
            </h1>
          </div>
        </section>
      );
  }
};

export default Event;
