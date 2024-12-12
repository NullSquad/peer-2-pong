import { Separator } from "../components/Separator";
import  Join  from "../components/Join";
import  LeaderboardTable  from "../components/LeaderboardTable";

const Competition = () => {

	return (
    <main className="container w-screen h-screen min-w-max">
		<Separator>Leaderboard</Separator>
		<div className="flex  mb-4">
			<Join />
		</div>
		<LeaderboardTable />
    </main>
  );
};

export default Competition;
