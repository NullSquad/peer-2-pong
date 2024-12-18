export const InfoMatchBox = ({ children }) => {
  return (
    <>
      <div
        className="absolute right-[2px] sm:right-1 bottom-[-9px] sm:bottom-[-6px] md:bottom-[-9px] bg-gray-900 text-white text-xs sm:text-sm md:text-sm p-1 md:p-2 rounded-lg z-10"
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
