export const getMatches = () => {
  return fetch(`/api/matches`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch matches");
    }
    return response.json();
  });
};

export const getMyMatchesByCompetition = (competitionID) => {
  return fetch(`/api/matches/competition/${competitionID}/me`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch my matches");
    }
    return response.json();
  });
};

export const reportMatch = (match) => {
	console.log(match);
	const { _id, ...matchWithoutID } = match;
  return fetch(`/api/matches/${_id}/report`, {
    method: "POST",
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify( matchWithoutID ),
  }).then((response) => {
    if (!response.ok) {
				console.error(response);
      throw new Error("Failed to report match");
    }
    return response.json();
  });
};

export const confirmMatch = (match) => {
  return fetch(`/api/matches/${_id}/report`, {
    method: "POST",
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify( {match} ),
  }).then((response) => {
    if (!response.ok) {
				console.error(response);
      throw new Error("Failed to report match");
    }
    return response.json();
  });
};
