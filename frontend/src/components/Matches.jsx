import MatchCard from "./MatchCard";

const Matches = ({ matches }) => {
  return (
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
          matchID={match.matchID}
        />
      ))}
    </section>
  );
};

export default Matches;
