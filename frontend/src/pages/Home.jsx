import useAuth from "../hooks/useAuth";
import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import {getCompetitions} from "../services/competitionsService";
import {getMatches, reportMatch} from "../services/matchesService";
import { useEffect, useState } from "react";
import Matches from "../components/Matches"; 

const Home = () => {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [currentSwipe, setCurrentSwipe] = useState(0);

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

  useEffect(() => {
    getMatches()
      .then((data) => {
        const formattedMatches = data.map((matches) => ({
          matchID: matches._id,
          competition: matches.competition,
          player1: matches.players[0],
          player2: matches.players[1],
          status: matches.status,
        }));
        setMatches(formattedMatches);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const currentCompetitionId = competitions[currentSwipe]?.id;
  const filteredMatches = matches.filter(
    (match) => match.competition === currentCompetitionId
  );

  useEffect(() => {
    if (competitions[currentSwipe]) {
      console.log("ID de la competición actual:", competitions[currentSwipe].id);
    }
  }, [currentSwipe, competitions]);

  return (
    <main className="relative inset-0 w-full h-full mt-5 bg-pattern bg-cover">
      <Header />
      <Slider setSwipe={setCurrentSwipe}>
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
      <Matches matches={filteredMatches} />
    </main>
  );
};

export default Home;
