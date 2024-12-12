const UserLeaderboard = ({ index, photo, login, score }) => {
    return (
        <tr
			className={`border border-black ${
				index === 10
					? "bg-yellow-500/80"
					: index % 2 === 0
					? "bg-gray-200/70"
					: "bg-gray-200/90"
			}`}
		>
			<td className="align-middle py-1 w-1/4"> {index + 1} </td>
            <td className="align-middle py-1 w-1/4 text-center">
                <img
                    src={photo}
                    alt={`${login}'s avatar`}
                    className={`${index <= 2 ? "border-[0.2em] border-yellow-400" : "border-2 border-gray-700"} w-10 h-10 rounded-full  cursor-pointer mx-auto`}
                />
            </td>
            <td className="align-middle py-1 w-1/4">{login}</td>
            <td className="align-middle py-1 w-1/4">{score}</td>
        </tr>
    );
};

export default UserLeaderboard;