import { listMatches } from "./matches.ts";

export type Player = {
  name: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  score: number;
  pointDifference: number;
  playerType: "Elite" | "Avanzado" | "Debutante";
};

export async function listPlayers(): Promise<Player[]> {
  const matches = await listMatches();

  // Crear un mapa de jugadores para realizar un seguimiento de su información
  const playersMap: Map<string, Player> = new Map();

  for (const match of matches) {
    const winner = match.winnerName;
    const loser = match.loserName;
    const winnerScore = match.winnerScore;
    const loserScore = match.loserScore;

    // Actualizar la información del ganador
    if (!playersMap.has(winner)) {
      playersMap.set(winner, {
        name: winner,
        matchesPlayed: 0,
        matchesWon: 0,
        matchesLost: 0,
        score: 0,
        pointDifference: 0,
        playerType: "Debutante", // Inicialmente se asigna como debutante
      });
    }
    const winnerPlayer = playersMap.get(winner)!;
    winnerPlayer.matchesPlayed++;
    winnerPlayer.matchesWon++;
    winnerPlayer.score += (winnerScore === 1) ? 1 : 3;
    winnerPlayer.pointDifference += winnerScore - loserScore;

    // Actualizar la información del perdedor
    if (!playersMap.has(loser)) {
      playersMap.set(loser, {
        name: loser,
        matchesPlayed: 0,
        matchesWon: 0,
        matchesLost: 0,
        score: 0,
        pointDifference: 0,
        playerType: "Debutante", // Inicialmente se asigna como debutante
      });
    }
    const loserPlayer = playersMap.get(loser)!;
    loserPlayer.matchesPlayed++;
    loserPlayer.matchesLost++;
    loserPlayer.score += (loserScore === -1) ? -1 : 0;
    loserPlayer.pointDifference += winnerScore - loserScore;
  }

  // Obtener la lista de jugadores del mapa
  const players: Player[] = Array.from(playersMap.values());

  // Ordenar a los jugadores por score de mayor a menor
  players.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // Ordenar por score de mayor a menor
    } else {
      return b.pointDifference - a.pointDifference; // En caso de empate, ordenar por pointDifference
    }
  });

  // Asignar el tipo de jugador basado en su posición en la clasificación
  for (let i = 0; i < players.length; i++) {
    if (i < 8) {
      players[i].playerType = "Elite";
    } else if (i < 24) {
      players[i].playerType = "Avanzado";
    }
    // El resto seguirá siendo "debutante" por defecto
  }

  return players;
}
