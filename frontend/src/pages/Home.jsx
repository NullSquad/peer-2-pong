import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";

const Home = ({ user }) => {
  let   matches = []
  const dates = ["2024-12-01T12:00:00", "2024-12-05T12:00:00", "2025-12-31T12:00:00"];

  for (let i = 0; i < dates.length; i++)
    matches.push({user1: user, user2: user, date: dates[i] });
  return (
    <main className="min-h-screen bg-gray-800 text-white p-4">

      <Slider className="min-h-screen flex flex-col gap-6">
        <Event
          type="league"
          isParticipating={true}
          status="ends"
          targetDate="2024-12-04T16:59:59"
        >
          LEAGUE
        </Event>
        <Event
          type="tournament"
          isParticipating={false}
          status="start"
          targetDate="2024-12-31T23:59:59"
        >
          TOURNAMENT
        </Event>
      </Slider>

      <h1 className="bg-primary-yellow text-2xl font-bold mb-4">Matches</h1>
      {matches.map(match => {
        return <section className="space-y-4 py-6">
          <MatchCard
            player1={{
              name: match.user1.login,
              ...match.user1,
            }}
            player2={{
              name: match.user2.login,
              ...match.user2,
            }}
            targetDate={match.date}
          />
        </section>
      })}
    </main>
  );
};

export default Home;
