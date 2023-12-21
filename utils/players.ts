import { listMatches } from "./matches.ts";
import { intraApi } from "@/communication/intra.ts";

export class Player {
  name: string;
  score: number;
  pointDifference: number;
  playerType: "Elite" | "Avanzado" | "Debutante"; // Prime | Nova | Rookie
  matches: Match[];

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.pointDifference = 0;
    this.playerType = "Debutante";
    this.matches = [];
  }

  playMatch(match: Match, winnerScore: number, loserScore: number) {
    this.matches.push(match);
    if (match.winnerName === this.name) {
      this.score += (winnerScore === 1) ? 1 : 3;
      this.pointDifference += winnerScore - loserScore;
    } else {
      this.score += (loserScore === -1) ? -1 : 0;
      this.pointDifference += loserScore - winnerScore;
    }
  }

  get matchesPlayed(): number {
    return this.matches.length;
  }

  get matchesWon(): number {
    return this.matches.filter((match) => match.winnerName === this.name)
      .length;
  }

  get matchesLost(): number {
    return this.matches.filter((match) => match.loserName === this.name).length;
  }

  getLastResults(): ("win" | "lose")[] {
    const results = this.matches.map((match) =>
      match.winnerName === this.name ? "win" : "lose"
    );

    return results.slice(-3);
  }
}

export async function listPlayers(accessToken: string): Promise<Player[]> {
  const matches = await listMatches();

  const players: Player[] = [];

  for (const match of matches) {
    const winner = match.winnerName;
    const loser = match.loserName;
    const winnerScore = match.winnerScore;
    const loserScore = match.loserScore;

    let winnerPlayer = players.find((player) => player.name === winner);
    if (!winnerPlayer) {
      winnerPlayer = new Player(winner);
      players.push(winnerPlayer);
    }
    winnerPlayer.playMatch(match, winnerScore, loserScore);

    let loserPlayer = players.find((player) => player.name === loser);
    if (!loserPlayer) {
      loserPlayer = new Player(loser);
      players.push(loserPlayer);
    }
    loserPlayer.playMatch(match, winnerScore, loserScore);
  }

  players.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return b.pointDifference - a.pointDifference;
    }
  });

  for (let i = 0; i < players.length; i++) {
    if (i < 8) {
      players[i].playerType = "Elite";
    } else if (i < 24) {
      players[i].playerType = "Avanzado";
    }
  }
  return players;
}
