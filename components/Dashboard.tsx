import { User } from "@/utils/users.ts";
import { Player } from "@/utils/players.ts";
import { Header } from "@/components/Header.tsx";
import { Container } from "@/components/Container.tsx";
import { Table } from "@/components/Table.tsx";

export function Dashboard(
  { user, players }: { user: User; players: Player[] },
) {
  return (
    <main>
      <Header user={user} />
      <Container>
        <Table players={players} />
      </Container>
    </main>
  );
}
