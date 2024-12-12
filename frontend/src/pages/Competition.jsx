import { Separator } from "../components/Separator";
import  Join  from "../components/Join";
import  MoveBack  from "../components/MoveBack";
import  LeaderboardTable  from "../components/LeaderboardTable";

const Competition = ({id}) => {

	return (
    <main className="relative container w-screen h-screen min-w-max">
		<div className="flex  justify-between items-center  px-4 py-2">
			<MoveBack />
			<Join />
		</div>
		<Separator>Leaderboard</Separator>
		<LeaderboardTable />
    </main>
  );
};

export default Competition;
