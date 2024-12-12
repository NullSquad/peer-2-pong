export const getCompetitions = () => {
  return fetch(`/api/competitions`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch competitions");
    }
    return response.json();
  });
};

export default getCompetitions;
