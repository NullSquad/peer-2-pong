export const InfoMatchBox = ({ children }) => {
  return (
    <>
      <div
        className="absolute right-2 bottom-[1px] sm:bottom-[2px] md:bottom-[3px] bg-gray-900 text-white text-xs sm:text-sm md:text-sm p-1 md:p-2 rounded-lg z-10"
        style={{
          width: "max-content",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default InfoMatchBox;
