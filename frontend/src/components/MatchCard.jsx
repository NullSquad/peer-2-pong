import { useState } from "preact/hooks";
import { Phase1, Phase3, Phase4, Phase5 } from "./MatchPhases";

export function MatchCard({ match, refresh }) {
  // setear phase dependiendo del status
  const phaseMap = {
    1: Phase1,
    3: Phase3,
    4: Phase4,
    5: Phase5,
  };

  const getStatusNumber = (status) => {
    const statusMap = {
      scheduled: 1,
      pending: 4,
      reported: 3,
      confirmed: 5,
    };
    return statusMap[status] || 0;
  };

  const [phaseNumber, setPhaseNumber] = useState(getStatusNumber(match.status));
  const PhaseComponent = phaseMap[phaseNumber] || null;
  if (phaseNumber != getStatusNumber(match.status)) {
    setPhaseNumber(getStatusNumber(match.status));
  }
  console.log(match)

  return (
    <div className="relative flex w-full max-w-4xl h-[60px] sm:h-[94px] md:h-28 overflow-visible bg-invisible">
      <PhaseComponent match={match} refresh={refresh} />
    </div>
  );
}

export default MatchCard;
