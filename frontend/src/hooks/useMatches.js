import { useState, useEffect } from "preact/hooks";
import { getMyMatchesByCompetition } from "../services/matchesService";

export function useMatches(competitionID) {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  function refreshMatches() {
    console.log("refreshing matches");
    if (competitionID) {
      getMyMatchesByCompetition(competitionID)
        .then((data) => {
          const formattedMatches = data.map((match) => ({
            id: match._id,
            competition: match.competition_id,
            players: match.players.map((player) => ({
              player_id: player.player_id,
              score: player.score,
              image: player.image,
              login: player.login,
            })),
            status: match.status,
            date: match.date,
          }));
          setMatches(formattedMatches);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }

  useEffect(refreshMatches, [competitionID]);

  return { matches, refreshMatches, error };
}
