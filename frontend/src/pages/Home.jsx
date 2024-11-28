import MatchCard from "../components/MatchCard";
import Slider from "../components/Slider";
import Event from "../components/Events";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <Slider>
          <Event class="bg-primary size-40 flex items-center justify-center" > LEAGUE </Event>
          <Event class="bg-primary size-40 flex items-center justify-center" > TOURNAMENT </Event>
          <Event class="bg-primary size-40 flex items-center justify-center" > MORE EVENTS </Event>
      </Slider>

      <section className="space-y-4">
        <MatchCard
          player1={{
            name: "bautrodr",
            image:
              "https://cdn.discordapp.com/attachments/1308031526679744599/1311673014538080286/bautrodr.png?ex=6749b630&is=674864b0&hm=20041c788bba199329416c896a6ddfdd66ca56707aa6fbfb1d3481c56a78b614&",
          }}
          player2={{
            name: "sguzman",
            image:
              "https://cdn.discordapp.com/attachments/1308031526679744599/1311673014248542218/sguzman.png?ex=6749b630&is=674864b0&hm=c333fd4fd8253335242fcc44980dde91094fa2cebadb24903c420a97dddefddb&",
          }}
          targetDate="2024-12-01T12:00:00"
        />
      </section>
    </main>
  );
};

export default Home;
