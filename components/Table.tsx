import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function Table(props: Props) {
  return (
    <table class="min-w-full text-sm text-red-400">
      <thead class="bg-red-800 text-xs uppercase font-medium">
        <tr>
          <th></th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            Player
          </th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            Matches
          </th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
            Wins
          </th>
          <th scope="col" class="px-6 py-3 text-left tracking-wider">
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
        {props.children}
      </tbody>
    </table>
  );
}
