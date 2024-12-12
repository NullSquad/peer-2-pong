import useAuth from "../hooks/useAuth";
import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import { getCompetitions } from "../services/competitionsService";
import { useEffect, useState } from "preact/hooks";
import Matches from "../components/Matches";

const Home = () => {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);
  const [currentCompetition, setCurrentCompetition] = useState(0);

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
      <Matches competitionID={competitions[currentCompetition]?.id} />
    </main>
  );
};

export default Home;
