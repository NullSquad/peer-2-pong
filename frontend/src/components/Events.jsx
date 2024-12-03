// const Tournament = ({ children }) => {
//   return (
//     <section
//       className="flex bg-[url('../../assets/tournament.svg')] h-full -skew-x-12 border-4 border-black items-center justify-center relative bg-cover bg-center shadow-lg mx-auto
//           min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
//           md:min-w-[24rem] md:min-h-[14rem]
//           lg:min-w-[28rem] lg:min-h-[16rem]"
//     >
//       <div className="text-white text-center transform skew-x-12 -translate-y-10 sm:-translate-y-12 md:-translate-y-14 lg:-translate-y-16">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
//           {children}
//         </h1>
//       </div>
//     </section>
//   );
// };

// const League = ({ children }) => {
//   return (
//     <section
//       className="flex bg-[url('../../assets/tournament.svg')] h-full -skew-x-12 border-4 border-black items-center justify-center relative bg-cover bg-center shadow-lg mx-auto
//           min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
//           md:min-w-[24rem] md:min-h-[14rem]
//           lg:min-w-[28rem] lg:min-h-[16rem]"
//     >
//       <div className="text-white text-center transform -translate-y-8 sm:-translate-y-10 md:-translate-y-12">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
//           {children}
//         </h1>
//       </div>
//     </section>
//   );
// };

// const Event = ({ imageURL, children }) => {
//   return (
//     <section
//       className={`flex bg-[url('${imageURL}')] h-full -skew-x-12 border-4 border-black items-center justify-center relative bg-cover bg-center shadow-lg mx-auto
//       min-w-[16rem] min-h-[10rem] sm:min-w-[20rem] sm:min-h-[12rem]
//       md:min-w-[24rem] md:min-h-[14rem]
//       lg:min-w-[28rem] lg:min-h-[16rem]`}
//     >
//       <div className="text-white text-center transform skew-x-12 -translate-y-10 sm:-translate-y-12 md:-translate-y-14 lg:-translate-y-16">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
//           {children}
//         </h1>
//       </div>
//     </section>
//   );
// };
//

import CountdownTimer from "./CountdownTimer";

// Event component with two info sections and a countdown timer
const Event = ({ type, isParticipating, status, children, targetDate }) => {
  return (
    <div className="relative">
      {/* Container that holds both left and right info */}
      <div className="relative flex justify-between pt-[.25rem] items-center translate-x-[0.6rem] sm:translate-x-[0.7rem] md:translate-x-[0.81rem] lg:translate-x-[0.91rem] -skew-x-[8.2deg] bg-black px-3">
        {/* left text */}
        <p
          className={`text-primary-yellow text-xs sm:text-xs md:text-sm skew-x-[8.2deg] ${isParticipating ? "" : "invisible"}`}
        >
          Participating
        </p>

        {/* status right text */}
        <p className="text-xs sm:text-xs md:text-sm text-right skew-x-[8.2deg]">
          {`${type} ${status} in: `}
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
        {type.toLowerCase() === "tournament" ? (
          <div
            className={`flex bg-tournament scale-[1.1] -translate-x-1 absolute inset-0 skew-x-6 bg-cover bg-bottom`}
          />
        ) : (
          <div
            className={`flex bg-league scale-[1.1] -translate-x-1 absolute inset-0 skew-x-6 bg-cover bg-bottom`}
          />
        )}

        <div className="flex justify-center translate-y-8">
          <div className="text-white skew-x-6">
            <h1 className="text-2xl text-stroke sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
              {children}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Event;
