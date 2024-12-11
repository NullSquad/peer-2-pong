export function BaseCard() {
	return (
		<div className="z-10 relative flex w-full max-w-4xl h-[86px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
			<div className="relative flex w-full h-14 sm:h-16 -skew-x-[8deg]">
				{/* Player 1 Side */}
				<div className="flex items-center justify-center bg-accent-blue-light w-1/2 px-3 py-2 text-black">
				</div>

				{/* Space between blue and red */}
				<div className="w-1"></div>

				{/* Player 2 Side */}
				<div className="flex items-center justify-center bg-red-500 w-1/2 px-3 py-2 text-black">
				</div>
			</div>
		</div>
	);
}

export default BaseCard;
