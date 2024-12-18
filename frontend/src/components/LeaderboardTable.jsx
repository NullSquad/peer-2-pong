import useAuth from "../hooks/useAuth";
import UserLeaderboard from "./UserLeaderboard";

const LeaderboardTable = () => {
	const { user } = useAuth();
	// Se recogerá de la BBDD
	const users = Array(50).fill({ photo: user.image, login: user.login, score: 5 });

	if (!users || users.length === 0) {
		return <p>No users available</p>;
	}

	return (
		<section className="flex justify-center items-start h-auto mt-16 text-white">
			<div className="w-[90%] sm:w-2/3 sm:w-6/7 h-auto h-max-[80vh] text-center">
				<table className="w-full border-collapse bg-yellow-500 rounded-t-2xl">
					<thead className="">
						<tr>
							<th className="p-2 w-[25%] text-sm sm:text-2xl border-text-black text-stroke">Player</th>
							<th className="p-2 w-[15%] text-sm sm:text-2xl border-text-black text-stroke">Coalition</th>
							<th className="p-2 w-[15%] text-sm sm:text-2xl border-text-black text-stroke">Points</th>
							<th className="p-2 w-[15%] text-sm sm:text-2xl border-text-black text-stroke">PG</th>
							<th className="p-2 w-[15%] text-sm sm:text-2xl border-text-black text-stroke">W</th>
							<th className="p-2 w-[15%] text-sm sm:text-2xl border-text-black text-stroke">L</th>
						</tr>
					</thead>
				</table>
				<div className="max-h-[70vh] h-auto overflow-y-scroll">
					<table className="w-full min-w-[10em] border-collapse border-t-[0.17em] border-black sm:text-lg text-xs">
						<tbody>
							{users.map((user, index) => (
								<UserLeaderboard
									key={index}
									index={index}
									photo={user.photo}
									login={user.login}
									score={user.score}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default LeaderboardTable;