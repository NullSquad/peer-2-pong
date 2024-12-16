import { useState, useEffect } from "preact/hooks";
import { getMyMatchesByCompetition } from "../services/matchesService";

export function useMatches(competitionID) {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  function refreshMatches() {
    if (competitionID) {
      getMyMatchesByCompetition(competitionID)
        .then((data) => {
          setMatches(data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }

  useEffect( refreshMatches, [competitionID]);

  return { matches, refreshMatches, error };
}
