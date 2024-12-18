export const MatchText = ({ player }) => {
  return (
    <>
      <span className="text-sm sm:text-lg md:text-xl skew-x-[8deg] mr-2 text-black">
        {player.login}
      </span>
    </>
  );
};
