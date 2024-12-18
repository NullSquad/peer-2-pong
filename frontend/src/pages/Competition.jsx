import { Separator } from "../components/Separator";
import  Join  from "../components/Join";
import  MoveBack  from "../components/MoveBack";
import  LeaderboardTable  from "../components/LeaderboardTable";

const Competition = ({id}) => {

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

export default Competition;
