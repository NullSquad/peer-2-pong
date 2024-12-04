import useAuth from "../hooks/useAuth";
import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";

const Home = () => {
  const { user } = useAuth();

  return (
      <main className="relative inset-0 w-full h-full bg-pattern bg-cover pt-6 sm:pt-10">
        <Header />
          <Slider className="min-h-screen flex flex-col gap-6">
            <Event
              type="league"
              isParticipating={true}
              status="ends"
              targetDate="2024-12-09T16:59:59"
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
          <Separator>Matches</Separator>
          <section className="flex flex-col flex-wrap justify-center items-center mx-5">
            <MatchCard
              player1={{
                name: user.login,
                image: user.image,
              }}
              player2={{
                name: user.login,
                image: user.image,
              }}
              targetDate="2024-12-07T12:00:00"
            />
          </section>
          <section className="flex flex-col flex-wrap justify-center items-center mx-5">
            <MatchCard
              player1={{
                name: user.login,
                image: user.image,
              }}
              player2={{
                name: user.login,
                image: user.image,
              }}
              targetDate="2024-12-29T12:00:00"
            />
          </section>
          <section className="flex flex-col flex-wrap justify-center items-center mx-5">
            <MatchCard
              player1={{
                name: user.login,
                image: user.image,
              }}
              player2={{
                name: user.login,
                image: user.image,
              }}
              targetDate="2024-12-10T12:00:00"
            />
          </section>
      </main>
  );
};

export default Home;
