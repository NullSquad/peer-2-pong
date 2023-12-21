import { Player } from "@/utils/players.ts";
import { CheckL, CheckW } from "@/components/Vector.tsx";

export function Table({ players }: { players: Player[] }) {
  const renderRank = ({ player }) => {
    switch (player.playerType) {
      case "Elite":
        return ("hover:text-orange transition-all");
      case "Avanzado":
        return ("hover:text-green transition-all");
      case "Debutante":
        return ("hover:text-cyan transition-all");
      default:
        return null;
    }
  };
  const renderRank2 = ({ player }) => {
    switch (player.playerType) {
      case "Elite":
        return ("border-l-orange");
      case "Avanzado":
        return ("border-l-green");
      case "Debutante":
        return ("border-l-cyan");
      default:
        return null;
    }
  };
  const last3 = ({ player, i }) => {
    switch (player.getLastResults()[i]) {
      case "win":
        return (
          <>
            <CheckW />
          </>
        );
      case "lose":
        return (
          <>
            <CheckL />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <table class="min-w-full text-sm text-red-400">
      <thead class="bg-red-800 text-xs uppercase font-medium">
        <tr>
          <th class="bg-orange border-l-4 border-orange px-4">N°</th>
          <th scope="col" class="bg-orange px-6 py-3 text-left tracking-wider">
            Player
          </th>
          <th
            scope="col"
            class="bg-orange hidden sm:table-cell px-6 py-3 text-left tracking-wider"
          >
            Matches
          </th>
          <th
            scope="col"
            class="bg-orange hidden sm:table-cell px-6 py-3 text-left tracking-wider"
          >
            Wins
          </th>
          <th
            scope="col"
            class="bg-orange hidden sm:table-cell px-6 py-3 text-left tracking-wider"
          >
            Losses
          </th>
          <th
            scope="col"
            class="hidden sm:table-cell bg-orange px-6 py-3 text-left tracking-wider"
          >
            PD
          </th>
          <th scope="col" class="bg-orange px-6 py-3 text-left tracking-wider">
            Score
          </th>
          <th
            scope="col"
            class="bg-orange px-6 py-3 tracking-wider text-center"
          >
            L3
          </th>
        </tr>
      </thead>
      <tbody class="bg-red-800">
        {players.map((player: Player, index: number) => (
          <tr
            class={index % 2 === 0 ? "bg-red-900 bg-opacity-20" : "bg-red-800"}
          >
            <td
              className={`border-l-4 ${
                renderRank2({ player })
              } text-sm sm:text-base text-center`}
            >
              {index + 1}
            </td>
            <td
              className={`text-sm sm:text-base pl-2 sm:pl-4 px-4 sm:px-6 py-4 whitespace-nowrap text-center ${
                renderRank({ player })
              }`}
            >
              {/* <img class="w-5" src={player.image} alt={player.name} /> */}
              <a
                href={`https://profile.intra.42.fr/users/${player.name}`}
                class="ml-2 font-medium hover:font-bold"
                target="_blank"
              >
                {player.name}
              </a>
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-center">
              {player.matchesPlayed}
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-center">
              {player.matchesWon}
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-center">
              {player.matchesLost}
            </td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-center">
              {player.pointDifference}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              {player.score}
            </td>
            <td class="flex px-6 py-4 whitespace-nowrap">
              {last3({ player, i: 2 })}
              {last3({ player, i: 1 })}
              {last3({ player, i: 0 })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
