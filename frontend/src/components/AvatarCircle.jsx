export const AvatarCircle = ({player}) => {
	return (
		<>
			 <img
              src={player.image}
              alt={player.name}
              className="w-12 sm:w-14 rounded-full border-2 skew-x-[8deg] border-black mr-2"
            />
		</>
	)
}

export default AvatarCircle;
