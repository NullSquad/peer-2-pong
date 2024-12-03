import { useContext, useEffect } from "preact/hooks";
import { AuthContext } from "../App";
import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <Slider>
        <Event class="bg-primary size-40 flex items-center justify-center">
          {" "}
          LEAGUE{" "}
        </Event>
        <Event class="bg-primary size-40 flex items-center justify-center">
          {" "}
          TOURNAMENT{" "}
        </Event>
        <Event class="bg-primary size-40 flex items-center justify-center">
          {" "}
          MORE EVENTS{" "}
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
  );
};

export default Home;
