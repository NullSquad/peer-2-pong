export const getSession = () => {
  return fetch(`/api/auth/session`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }
    return response.json();
  });
};

export const logout = () => {
  return fetch(`/api/auth/logout`, {
    method: "POST",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to logout");
    }
    return response.json();
  });
};
