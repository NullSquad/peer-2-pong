import { Handlers, PageProps } from "$fresh/server.ts";
import { listPlayers, Player } from "../utils/players.ts";
import { Main } from "../components/Main.tsx";
import { Header } from "../components/Header.tsx";
import { Container } from "../components/Container.tsx";
import { Table } from "../components/Table.tsx";
import { PlayerRow } from "../components/PlayerRow.tsx";

interface Data extends State {
  posts: Player[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const players = await listPlayers();
    return ctx.render({ ...ctx.state, players });
  },
};

export default function Home(props: PageProps<Data>) {
  const { players } = props.data;
  return (
    <>
      <Main>
        <Header />
        <Container>
          <Table>
            {players.map((player, index) => (
              <PlayerRow index={index} player={player} />
            ))}
          </Table>
        </Container>
      </Main>
    </>
  );
}
