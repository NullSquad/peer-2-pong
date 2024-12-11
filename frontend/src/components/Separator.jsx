import useAuth from "../hooks/useAuth";

export const Separator = ({ children }) => {
  const { user } = useAuth();
  return (
    <header className="relative mb-10">
      {/* Primary Element */}
      <div className="relative overflow-hidden ">
        
      <div
        className="relative z-20 bg-yellow-500 text-white py-2 px-5 sm:px-10 ml-0
        w-[50%] sm:w-[40%] md:w-[35%] lg:w-[30%] min-w-max flex justify-between items-center 
        border-t-[8px] border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px]
        border-r-black shadow-md transform -skew-x-[8deg]">
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold skew-x-[8deg]"
          style={{
            WebkitTextStroke: "1px black",
            color: "white",
          }}
        >
          {children.toUpperCase()}
        </h2>
      </div>
      </div>

      {/* Secondary Element */}
      <div
        className="relative z-10 bg-yellow-500 text-white mt-5 py-1.5 px-5 sm:px-10 ml-0
        w-[60%] sm:w-[50%] md:w-[45%] lg:w-[40%] flex justify-between items-center 
        border-t-[8px] border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px]
        border-r-black shadow-md transform -skew-x-[8deg]">
      </div>

      {/* Tertiary Element */}
      <div
        className="relative z-0 bg-yellow-500 text-white py-1.5 px-5 sm:px-10 ml-0 w-[70%]
        sm:w-[60%] md:w-[55%] lg:w-[50%] flex justify-between items-center border-t-[8px]
        border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px] border-r-black 
        shadow-md transform -skew-x-[8deg]">
      </div>
    </header>
  );
};
