import Slider from "../components/Slider";
import Event from "../components/Events";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import { getCompetitions } from "../services/competitionsService";
import { useEffect, useState } from "preact/hooks";
import Matches from "../components/Matches";
import {getMyMatchesByCompetition} from "../services/matchesService";

const Home = () => {
  const [competitions, setCompetitions] = useState([]);
  const [currentCompetition, setCurrentCompetition] = useState(0);
  const [matches, setMatches] = useState([]);

  // con esto se recogen las competiciones de la db
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

  // con esto se consiguen los matches asociados a cada una de las competiciones del usuario
  useEffect(() => {
    if (competitions.length > 0) {
      const competitionID = competitions[currentCompetition]?.id;
      if (competitionID) {
        getMyMatchesByCompetition(competitionID)
          .then((data) => {
            setMatches(data);
          })
          .catch((err) => {
            console.log(err)
          });
      }
    }
  }, [currentCompetition, competitions]); // dependencias: depende de la competiciones y de la current competition

  return (
    <main className="relative inset-0 w-full h-full mt-5 bg-pattern bg-cover">
      <Header />
      <Slider setCurrentCompetition={setCurrentCompetition}>
        {competitions.map((competition) => (
          <Event
            key={competition.id}
            type={competition.type}
            isParticipating={competition.isParticipating}
            status={competition.status}
            targetDate={competition.targetDate}
          >
            {competition.name.toUpperCase()}
          </Event>
        ))}
      </Slider>
      <Separator>Matches</Separator>
      <Matches matches={matches} />
    </main>
  );
};

export default Home;
