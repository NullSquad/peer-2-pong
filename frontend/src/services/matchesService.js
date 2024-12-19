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

export const confirmMatch = (id, confirmation) => {
  console.log(id, confirmation)
  confirmation = {confirmation}
  return fetch(`/api/matches/${id}/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(confirmation),
  }).then((response) => {
    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to report match");
    }
    return response.json();
  }).catch((err) => {
      console.log(err)
    });
};
