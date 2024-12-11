const UserLeaderboard = ({ index, photo, login, score }) => {
    return (
        <tr className={`${login === "user" ? "bg-yellow-300/60" : "bg-gray-200/80"} border border-black`}>
			<td className="align-middle py-2 w-1/4"> {index + 1} </td>
            <td className="align-middle py-2 w-1/4 text-center">
                <img
                    src={photo}
                    alt={`${login}'s avatar`}
                    className={`${index <= 2 ? "border-2 border-gray-200" : "border-2 border-gray-700"} w-8 h-8 rounded-full  cursor-pointer mx-auto`}
                />
            </td>
            <td className="align-middle py-2 w-1/4">{login}</td>
            <td className="align-middle py-2 w-1/4">{score}</td>
        </tr>
    );
};

export default UserLeaderboard;