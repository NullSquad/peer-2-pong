import MatchCard from "../components/MatchCard";

const Home = () => {
  const matches = [
    {
      player1: "bautrodr",
      player2: "sguzman",
      player1Img: "https://via.placeholder.com/150",
      player2Img: "https://via.placeholder.com/150",
      initialTime: 3 * 24 * 60 * 60, // 3 días en segundos
    },
    {
      player1: "jdoe",
      player2: "asmith",
      player1Img: "https://via.placeholder.com/150",
      player2Img: "https://via.placeholder.com/150",
      initialTime: 2 * 24 * 60 * 60, // 2 días en segundos
    },
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <MatchCard
            key={index}
            player1={match.player1}
            player2={match.player2}
            player1Img={match.player1Img}
            player2Img={match.player2Img}
            initialTime={match.initialTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
