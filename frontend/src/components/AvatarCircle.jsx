export const AvatarCircle = ({ player }) => {
  return (
    <>
      <img
        src={player.image}
        alt={player.login}
        className="w-10 sm:w-14 md:w-[70px] rounded-full border-2 skew-x-[8deg] border-black mr-2"
      />
    </>
  );
};

export default AvatarCircle;
