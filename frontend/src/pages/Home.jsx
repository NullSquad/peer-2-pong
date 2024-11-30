import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-800 text-white p-4">
      <Slider className="min-h-screen flex flex-col gap-6">
          <Event className="bg-primary size-40 flex items-center justify-center" >LEAGUE</Event>
          <Event className="bg-primary size-40 flex items-center justify-center" >TOURNAMENT</Event>
      </Slider>
    </main>
  );
};



export default Home;
