import useAuth from "../hooks/useAuth";
import UserLeaderboard from "./UserLeaderboard";

const LeaderboardTable = ({ competitionPlayers }) => {
	const { user } = useAuth();
	// Se recogera de la BBDD
	const users = competitionPlayers;
  if (!user) {
    return <div>Loading...</div>;
  }

	return (
		<section className="flex justify-center items-start h-auto mt-16">
			<div className="w-[90%] sm:w-2/3 sm:w-6/7 border border-black text-center">
				<table className="w-full border-collapse border border-black">
					<thead className="bg-yellow-600">
						<tr>
							<th className="border border-black p-2 w-1/4 text-[10px] sm:text-lg"> POSITION </th>
							<th className="border border-black p-2 w-1/4 text-[10px] sm:text-lg"> PHOTO </th>
							<th className="border border-black p-2 w-1/4 text-[10px] sm:text-lg"> LOGIN </th>
							<th className="border border-black p-2 w-1/4 text-[10px] sm:text-lg"> SCORE </th>
						</tr>
					</thead>
				</table>
				<div className="h-[70vh] overflow-y-scroll">
					<table className="w-full border-collapse">
						<tbody>
						{users.map((user, index) => {
							return (
								<UserLeaderboard
									key={index}
									index={index}
									photo={user.photo}
									login={user.login}
									score={user.score}
								/>
							);
						})}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default LeaderboardTable;
