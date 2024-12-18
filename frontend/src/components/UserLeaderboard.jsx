import useAuth from "../hooks/useAuth";

const UserLeaderboard = ({ index, photo, login, score }) => {
	const { user } = useAuth();
return (
	<tr
			className={`${
				// login === user.login
				// 	? "bg-yellow-500/20"
				// 	: 
					index % 2 === 0
					? "bg-gray-200/30"
					: "bg-gray-200/10"
			}`}
		>
		<td className="align-middle justify-center py-1 w-[25%]">
			<span
				className={`inline-block w-[1.3em] h-[1.3em] sm:w-[1.5em] sm:h-[1.5em] items-center justify-center mr-2 ${
				index <= 2 ? "bg-yellow-400 rounded-full" : ""
				}`}
			>
				{index + 1}
			</span>
			{login}
		</td>
		<td className="align-middle py-1 w-[15%] text-center">
			<img
				src={photo}
				alt={`${login}'s avatar`}
				className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer mx-auto ${
				index <= 2 ? "border-[0.2em] border-yellow-400" : "border-[0.2em] border-gray-700"
				}`}
			/>
		</td>
		<td className="align-middle py-1 w-[15%]">{score}</td>
		<td className="align-middle py-1 w-[15%]">{score}</td>
		<td className="align-middle py-1 w-[15%]">{score}</td>
		<td className="align-middle py-1 w-[15%]">{score}</td>
	</tr>
);
};

export default UserLeaderboard;