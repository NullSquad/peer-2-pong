import CrownImage from "../assets/CrownIcon.svg";

export const CrownIcon = ({ player }) => {
	return (
		<>
			<img
				src={CrownImage}
				alt="Crown Icon"
				className="w-12 sm:w-16 md:w-20 skew-x-[8deg]"
			/>
		</>
	);
};

export default CrownIcon;
