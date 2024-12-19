import { useState, useEffect } from "preact/hooks";
import { getCompetitions } from "../services/competitionsService";

export function useCompetitions() {
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    var today = new Date();
    getCompetitions()
      .then((data) => {
        const formattedCompetitions = data.map((competition) => ({
          id: competition._id,
          type: competition.type,
          name: competition.type.toUpperCase(),
          // isParticipating: competition.participating,
          status: new Date(competition.start_date) > today ? "start" : "end",
          // check if the competition has started or ended
          targetDate: status === "start" ? competition.start_date : competition.end_date,
        }));
        setCompetitions(formattedCompetitions);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { competitions, error };
}
