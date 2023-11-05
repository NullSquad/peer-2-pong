type Player = {
  name: string;
  image: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  score: number;
  playerType: "Elite" | "Avanzado" | "Debutante";
};

export async function listPlayers(): Promise<Players[]> {
  const playersData = [
    {
      name: "sguzman",
      image:
        "https://cdn.intra.42.fr/users/b4c2641d99c5484f2cd86dd8b454c457/sguzman.png",
      matchesPlayed: 20,
      matchesWon: 16,
      matchesLost: 4,
      score: 80,
      playerType: "Elite",
    },
    {
      name: "deordone",
      image:
        "https://cdn.intra.42.fr/users/b87ca409e3426d93cff377a3c1c3f031/deordone.png",
      matchesPlayed: 20,
      matchesWon: 16,
      matchesLost: 4,
      score: 80,
      playerType: "Avanzado",
    },
    // Add more player objects as needed
  ];
  return playersData;
}
