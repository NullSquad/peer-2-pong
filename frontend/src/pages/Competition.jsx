import { Separator } from "../components/Separator";
import  Join   from "../components/Join";
import  LeaderboardTable  from "../components/LeaderboardTable";
import { getCompetitionById } from "../services/competitionsService";
import { useEffect, useState } from "preact/hooks";

export const Competition = ({id}) => {

  console.log(id);
  const [competition, setCompetition] = useState(null);
  useEffect(() => {
    getCompetitionById(id) 
    .then((data) => {
      setCompetition(data);
    })
    
  }, [id]);

  if (!competition) {
    return <div>Loading...</div>;
  }

	return (
    <main className="relative container w-screen h-screen min-w-max">
		<div className="flex  justify-between items-center  px-4 py-2">
			<Join />
		</div>
		<Separator>Leaderboard</Separator>
		<LeaderboardTable competitionPlayers={competition.players}/>
    </main>
  );
};

