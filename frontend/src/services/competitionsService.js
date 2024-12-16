export const getCompetitions = () => {
  return fetch(`/api/competitions`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch competitions");
    }
    return response.json();
  });
};

export const getCompetitionById = (id) => {
  return fetch(`/api/competitions/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch competition");
    }
    return response.json();
  });
};

export const joinCompetition = (competition_id) => {
  return fetch(`/api/competitions/${competition_id}/join`, {
    method: "POST",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to join competition");
    }
    return response.json();
  });
};
