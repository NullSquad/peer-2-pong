import { useState, useEffect } from "preact/hooks";
import { getCompetitions } from "../services/competitionsService";

export function useCompetitions() {
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
	getCompetitions()
	  .then((data) => {
		const formattedCompetitions = data.map((competition) => ({
		  id: competition._id,
		  type: competition.type,
		  name: competition.type.toUpperCase(),
		  isParticipating: competition.participating,
		  status: competition.status,
		  targetDate: competition.date,
		}));
		setCompetitions(formattedCompetitions);
	  })
	  .catch((err) => {
      setError(err);
	  });
  }, []);

  return { competitions, error };
}
