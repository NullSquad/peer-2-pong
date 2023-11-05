import { Player } from "../utils/players.ts";
import { Star } from "./Star.tsx";

export function PlayerRow(props: { player: Player; index: number }) {
  const { player, index } = props;

  const renderStars = () => {
    switch (player.playerType) {
      case "Elite":
        return (
          <>
            <Star />
            <Star />
            <Star />
          </>
        );
      case "Avanzado":
        return (
          <>
            <Star />
            <Star />
          </>
        );
      case "Debutante":
        return <Star />;
      default:
        return null;
    }
  };

  return (
    <tr class={index % 2 === 0 ? "bg-red-900 bg-opacity-20" : "bg-red-800"}>
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
      <td class="px-6 py-4 whitespace-nowrap">{player.matchesPlayed}</td>
      <td class="px-6 py-4 whitespace-nowrap">{player.matchesWon}</td>
      <td class="px-6 py-4 whitespace-nowrap">{player.matchesLost}</td>
      <td class="px-6 py-4 whitespace-nowrap">{player.pointDifference}</td>
      <td class="px-6 py-4 whitespace-nowrap">{player.score}</td>
      <td class="flex px-6 py-4 whitespace-nowrap">
        {renderStars()}
      </td>
    </tr>
  );
}
