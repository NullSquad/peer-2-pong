import MatchCard from "./MatchCard";
import { useEffect, useState } from "preact/hooks";
import {
  getMyMatchesByCompetition,
  reportMatch,
} from "../services/matchesService";

const Matches = ({ matches }) => {
  if (matches.length === 0) {
    return <div>No matches available</div>;
  }

  return (
    <section className="flex flex-col flex-wrap justify-center items-center mx-5">
      {matches.map((match) => (
        <MatchCard key={match._id} match={match} />
      ))}
    </section>
  );
};
export default Matches;
