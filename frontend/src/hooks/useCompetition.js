import { useState, useEffect } from "preact/hooks";
import { getCompetitionById } from "../services/competitionsService";

export function useCompetition(id) {
  const [competition, setCompetition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCompetitionById(id)
      .then((data) => {
        const formattedCompetition = {
          id: data._id,
          type: data.type.toUpperCase(),
          status: data.status,
          targetDate: data.start_date,
          players: data.players,
        };
        setCompetition(formattedCompetition);
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  return { competition, error };
}
