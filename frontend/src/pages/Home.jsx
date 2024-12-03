import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-800 text-white p-4">
      <Slider className="min-h-screen flex flex-col gap-6">
        <Event
          type="League"
          isParticipating={true}
          status="ends"
          targetDate="2024-12-04T16:59:59"
        >
          LEAGUE
        </Event>
        <Event
          type="Tournament"
          isParticipating={false}
          status="start"
          targetDate="2024-12-31T23:59:59"
        >
          TOURNAMENT
        </Event>
      </Slider>
    </main>
  );
};

export default Home;
