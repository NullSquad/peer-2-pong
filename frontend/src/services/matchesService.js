export const getMatches = () => {
  return fetch(`/api/matches`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch matches");
    }
    return response.json();
  });
};

export const getMyMatchesByCompetition = (competitionID) => {
  return fetch(`/api/competitions/${competitionID}/matches/me`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch my matches");
      }
      return response.json();
    },
  );
};

export const reportMatch = (match) => {
  const { id, players } = match;
  return fetch(`/api/matches/${id}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(players),
  }).then((response) => {
    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to report match");
    }
    return response.json();
  });
};

export const confirmMatch = (id, tuvieja) => {
  return fetch(`/api/matches/${id}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tuvieja),
  }).then((response) => {
    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to report match");
    }
    return response.json();
  });
};
