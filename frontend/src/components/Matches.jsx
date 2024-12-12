import MatchCard from "./MatchCard";
import { useEffect, useState } from "preact/hooks";
import {getMyMatchesByCompetition, reportMatch} from "../services/matchesService";

const Matches = ({competitionID}) => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  if (competitionID === undefined) {
    return (setError("No competition selected"));
  }

  useEffect(() => {
    getMyMatchesByCompetition(competitionID)
      .then((data) => {
        // const formattedMatches = data.map((matches) => ({
        //   matchID: matches._id,
        //   competition: matches.competition,
        //   player1: matches.players[0],
        //   player2: matches.players[1],
        //   targetDate: matches.date,
        //   status: matches.status,
        // }));
        setMatches(data);
        // console.log(formattedMatches);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [competitionID]);

  return (
    <section className="flex flex-col flex-wrap justify-center items-center mx-5">
      {matches.map((match) => (
        <MatchCard
          key={match.matchID}
          match={match}
        />
      ))}
    </section>
  );
};

export default Matches;