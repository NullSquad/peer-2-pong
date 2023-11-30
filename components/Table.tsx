import { Player } from "@/utils/players.ts";

export function Table({ players }: { players: Player[] }) {
  return (
    <table class="min-w-full text-sm text-red-400">
      <thead class="bg-red-800 text-xs uppercase font-medium">
        <tr>
          <th></th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            Player
          </th>
          <th
            scope="col"
            class="hidden sm:table-cell px-6 py-3 text-left tracking-wider"
          >
            Matches
          </th>
          <th
            scope="col"
            class="hidden sm:table-cell px-6 py-3 text-left tracking-wider"
          >
            Wins
          </th>
          <th
            scope="col"
            class="hidden sm:table-cell px-6 py-3 text-left tracking-wider"
          >
            Losses
          </th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            PD
          </th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            Score
          </th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            Rank
          </th>
        </tr>
      </thead>
      <tbody class="bg-red-800">
        {players.map((player: Player, index: number) => (
          <tr
            class={index % 2 === 0 ? "bg-red-900 bg-opacity-20" : "bg-red-800"}
          >
            <td class="pl-4">{index + 1}</td>
            <td class="flex px-6 py-4 whitespace-nowrap">
              {/* <img class="w-5" src={player.image} alt={player.name} /> */}
              <a
                href={`https://profile.intra.42.fr/users/${player.name}`}
                class="ml-2 font-medium text-red-500 underline"
                target="_blank"
              >
                {player.name}
              </a>
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
              {player.matchesPlayed}
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
              {player.matchesWon}
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
              {player.matchesLost}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {player.pointDifference}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{player.score}</td>
            <td class="flex px-6 py-4 whitespace-nowrap">
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
