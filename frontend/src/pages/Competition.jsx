import { Separator } from "../components/Separator";
import Join from "../components/Join";
import LeaderboardTable from "../components/LeaderboardTable";

export const Competition = ({ id }) => {
  const { competition, error } = useCompetition(id);

  if (error) {
    return <div>Error loading competition</div>;
  }

  if (!competition) {
    return <div>Loading...</div>;
  }

	return (
    <main className="relative inset-0 w-full h-full mt-0 m-w-20 sm:pt-10">
		<div className="flex justify-between items-center w-[80%] sm:mx-10 mx-auto mb-4">
			<div>
				<MoveBack />
			</div>
			<div>
				<Join />
			</div>
		</div>
		<div>
			<Separator>Leaderboard</Separator>
		</div>
		<div>
			<LeaderboardTable />
		</div>
    </main>
  );
};
