
import CountdownTimer from "./CountdownTimer";

// Event component with two info sections and a countdown timer
const Event = ({ isLeague, infoLeft, infoRight, children, targetDate }) => {
  let type = (isLeague ? "bg-league" : "bg-tournament");
  return (
    <div className="relative">
      {/* Container that holds both left and right info */}
      <div className="text-primary-yello-DEFAULT relative flex justify-between items-center translate-x-[0.6rem] sm:translate-x-[0.7rem] md:translate-x-[0.81rem] lg:translate-x-[0.91rem] -skew-x-[8.2deg] bg-black px-3 sticky">
        {/* left align text */}
        <p className="text-primary-yello-DEFAULT text-xs sm:text-xs md:text-sm skew-x-[8.2deg]">
          {infoLeft}
        </p>

        {/* right align text */}
        <p className="text-xs sm:text-xs md:text-sm text-right skew-x-[8.2deg]">
          {infoRight}
          {/* Render Timer only if targetDate is defined*/}
          {targetDate && <CountdownTimer targetDate={targetDate} />}
        </p>
      </div>

      <section
        className={`
          relative overflow-hidden -skew-x-6 border-4 border-black
          shadow-lg mx-auto min-w-[16rem] min-h-[10rem] 
          sm:min-w-[20rem] sm:min-h-[12rem]
          md:min-w-[24rem] md:min-h-[14rem]
          lg:min-w-[28rem] lg:min-h-[16rem]
        `}
      >
        <div
          className={`flex ${type} scale-[1.1] -translate-x-1 absolute inset-0 skew-x-6 bg-cover bg-bottom`}
        />
        <div className="flex justify-center translate-y-8">
          <div className="text-white skew-x-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
              {children}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Event;
