export const MatchText = ({ player }) => {
  return (
    <>
      <span className="text-sm md:text-lg skew-x-[8deg] font-bold mr-2">
        {player.name}
      </span>
    </>
  );
};
