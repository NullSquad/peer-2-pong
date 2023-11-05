import { readCSVObjects } from "https://deno.land/x/csv@v0.9.2/mod.ts";

type Match = {
  date: string;
  winnerName: string;
  winnerScore: number;
  loserScore: number;
  loserName: string;
};

export async function listMatches(): Promise<Match[]> {
  const f = await Deno.open("./data/matches.csv");

  const matches: Match[] = [];

  for await (const obj of readCSVObjects(f)) {
    const match: Match = {
      date: obj["date"],
      winnerName: obj["winnerName"],
      winnerScore: parseInt(obj["winnerScore"]),
      loserScore: parseInt(obj["loserScore"]),
      loserName: obj["loserName"],
    };
    matches.push(match);
  }

  f.close();

  return matches;
}
