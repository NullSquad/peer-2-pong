const { VITE_API_URI = "" } = import.meta.env;

export const getSession = () => {
  return fetch(`${VITE_API_URI}/auth/session`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }
    return response.json();
  });
};
