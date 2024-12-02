import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";
import { Background } from "../components/Background/Background";
import { Header } from "../components/Header/Header";
import league from "../assets/league.svg"
import tournament from "../assets/tournament.svg"

const Home = ({ user }) => {
  return (
    <>
      <Background />
      <main className="relative min-h-screen text-white p-0">
        <Header user={user} />
        <h1 className="text-2xl font-bold mb-4">Matches</h1>
        <Slider className="min-h-screen flex flex-col gap-6">
          <Event
            imageURL= {league}
            className="bg-primary size-40 flex items-center justify-center"
            infoLeft="Participating"
            infoRight="League ends in: "
            targetDate="2024-12-04T23:59:59"
          >
            LEAGUE
          </Event>
          <Event
            imageURL={tournament}
            className="bg-primary size-40 flex items-center justify-center"
            infoRight="Tournament start in: "
            targetDate="2024-12-31T23:59:59"
          >
            TOURNAMENT
          </Event>
        </Slider>

        <section className="space-y-4 py-6">
          <MatchCard
            player1={{
              name: user.login,
              image: user.image,
            }}
            player2={{
              name: user.login,
              image: user.image,
            }}
            targetDate="2024-12-01T12:00:00"
          />
        </section>
        <section className="space-y-6 py-6">
          <MatchCard
            player1={{
              name: user.login,
              image: user.image,
            }}
            player2={{
              name: user.login,
              image: user.image,
            }}
            targetDate="2024-11-29T12:00:00"
          />
        </section>
        <section className="space-y-6 py-6">
          <MatchCard
            player1={{
              name: user.login,
              image: user.image,
            }}
            player2={{
              name: user.login,
              image: user.image,
            }}
            targetDate="2024-12-01T12:00:00"
          />
        </section>
      </main>
    </>
  );
};

export default Home;
