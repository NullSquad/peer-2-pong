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
    <main className="relative container w-screen h-screen min-w-max">
      <div className="flex  justify-between items-center  px-4 py-2">
        <Join />
      </div>
      <Separator>Leaderboard</Separator>
      <LeaderboardTable competitionPlayers={competition.players} />
    </main>
  );
};
