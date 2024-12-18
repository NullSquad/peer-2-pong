import MatchCard from "./MatchCard";
import Frame from "../assets/Frame.svg";

const Matches = ({ matches, refresh }) => {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col w-screen items-center justify-center">
        <img src={Frame} alt="No matches" className="lg:w-1/2 w-1/2 h-auto" />
      </div>
    );
  }

  return (
    <section className="flex flex-col flex-wrap justify-center items-center mx-5 gap-4">
      {matches.map((match) => (
        <MatchCard key={match._id} match={match} refresh={refresh} />
      ))}
    </section>
  );
};
export default Matches;
