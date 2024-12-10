import useAuth from "../hooks/useAuth";
import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import getCompetitions from "../services/competitionsService";
import { useEffect, useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);

  // matches should be fetched from the backend
  const matches = [
    {
      player1: { name: user.login, image: user.image, score: 0 },
      player2: { name: "sguzman", image: "https://cdn.intra.42.fr/users/b4c2641d99c5484f2cd86dd8b454c457/sguzman.png",
       score: 0 },
      targetDate: "2024-12-12T12:00:00",
      status: "to play",
      matchID: 1
    },
    {
      player1: { name: user.login, image: user.image, score: 11 },
      player2: { name: "rbarbier", image: "https://cdn.intra.42.fr/users/1cdba5317d27dac3cfb2b89ff10ebe67/rbarbier.png",
       score: 8},
      targetDate: "2024-12-29T12:00:00",
      status: "finished",
      matchID: 2
    },
    {
      player1: { name: user.login, image: user.image, score: 0 },
      player2: { name: "deordone", image: "https://cdn.intra.42.fr/users/b87ca409e3426d93cff377a3c1c3f031/deordone.png",
       score: 11 },
      targetDate: "2024-12-11T12:00:00",
      status: "waiting",
      matchID: 3
    },
  ];

  useEffect(() => {
    getCompetitions()
      .then((data) => {
        const formattedCompetitions = data.map((competition) => ({
          id: competition._id,
          type: competition.type,
          name: competition.type.toUpperCase(),
          isParticipating: competition.participating,
          status: competition.status,
          targetDate: competition.date,
        }));
        setCompetitions(formattedCompetitions);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);


  return (
    <main className="relative inset-0 w-full h-full mt-5 bg-pattern bg-cover">
      <Header />
      <Slider>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
            competitions.map((competition) => (
              <Event
                key={competition.id}
                type={competition.type}
                isParticipating={competition.isParticipating}
                status={competition.status}
                targetDate={competition.targetDate}
              >
                {competition.name.toUpperCase()}
              </Event>
            ))
          )}
      </Slider>
      <Separator>Matches</Separator>
      <section className="flex flex-col flex-wrap justify-center items-center mx-5">
        {matches.map((match) => (
          <MatchCard
            key={match.matchID}
            player1={match.player1}
            player2={match.player2}
            targetDate={match.targetDate}
            status={match.status}
            score1={match.player1.score}
            score2={match.player2.score}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
