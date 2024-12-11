import useAuth from "../hooks/useAuth";
import UserLeaderboard from "./UserLeaderboard";

const LeaderboardTable = () => {
	const { user } = useAuth();
	// Se recogera de la BBDD
	const users = Array(16).fill({ photo: user.image, login: user.login, score: 5});

	return (
		<section className="flex justify-center items-start h-auto mt-16">
			<div className="w-2/3 sm:w-6/7 border border-black text-center">
				<table className="w-full border-collapse border border-black">
					<thead className="bg-yellow-600">
						<tr>
							<th className="border border-black p-2 w-1/4 min-w-[5rem]"> POSITION </th>
							<th className="border border-black p-2 w-1/4 min-w-[5rem]"> PHOTO </th>
							<th className="border border-black p-2 w-1/4 min-w-[5rem]"> LOGIN </th>
							<th className="border border-black p-2 w-1/4 min-w-[5rem]"> SCORE </th>
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