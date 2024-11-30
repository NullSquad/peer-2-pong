export const Event = ({ children }) => {
  return (
    <>
      <div className="py-2 w-full max-w-4xl mx-auto">
        <div className="parallelogram-tuta w-full">
          <div className="time-container text-center text-sm sm:text-base md:text-lg lg:text-xl p-2">
            league ends in : 00h00mn00s
          </div>
          <div
            className="min-h-[100px] sm:min-h-[150px] md:min-h-[200px] w-full sm:min-w-[300px] md:min-w-[400px] 
                        flex flex-col items-center justify-center 
                        font-sans bg-accent-blue-light text-black 
                        text-center sm:text-right leading-tight sm:leading-[1px] 
                        text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold 
                        skew-x-[-0.5deg] justify-self-end"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
