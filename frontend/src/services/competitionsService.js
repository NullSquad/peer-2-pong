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
