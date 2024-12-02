import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-800 text-white p-4">
      <Slider className="min-h-screen flex flex-col gap-6">
        <Event
          imageURL="../../assets/league.svg"
          className="bg-primary size-40 flex items-center justify-center"
          infoLeft="Participating"
          infoRight="League ends in: "
          targetDate="2024-12-04T23:59:59"
        >
          LEAGUE
        </Event>
        <Event
          imageURL="../../assets/tournament.svg"
          className="bg-primary size-40 flex items-center justify-center"
          infoRight="Tournament start in: "
          targetDate="2024-12-31T23:59:59"
        >
          TOURNAMENT
        </Event>
      </Slider>
    </main>
  );
};

export default Home;
