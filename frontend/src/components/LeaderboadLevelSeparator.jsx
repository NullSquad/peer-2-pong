const LeaderboardLevelSeparator = ({ level }) => {
      return (
		<tr className="bg-white">
			<td  colspan="6" className="align-middle justify-center py-[0.25em] text-black text-stroke text-3xl">
				{level.toUpperCase()}
			</td>
		</tr>
	 );
};

export default LeaderboardLevelSeparator;