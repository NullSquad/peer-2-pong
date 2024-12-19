import Slider from "../components/Slider";
import Event from "../components/Events";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import { useState } from "preact/hooks";
import Matches from "../components/Matches";
import { useCompetitions } from "../hooks/useCompetitions";
import { useMatches } from "../hooks/useMatches";
import { Link } from "preact-router";

const Home = () => {
  const { competitions, compError } = useCompetitions();
  const [currentCompetition, setCurrentCompetition] = useState(0);
  const competitionID =
    competitions.length > 0 ? competitions[currentCompetition]?.id : null;
  const { matches, refreshMatches, matchError } = useMatches(competitionID);

  return (
    <main className="relative inset-0 w-full h-full mt-5">
      <Header />
        <Slider setCurrentCompe={setCurrentCompetition}>
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
      <Matches matches={matches} refresh={refreshMatches} />
    </main>
  );
};

export default Home;
