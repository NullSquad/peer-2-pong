import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { listPlayers, Player } from "@/utils/players.ts";
import { User } from "@/utils/users.ts";
import { Data } from "@/utils/state.ts";
import { intraApi } from "@/communication/intra.ts";
import { Dashboard } from "@/components/Dashboard.tsx";
import { Login } from "@/components/Login.tsx";

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return ctx.render(false);
  }

  const accessToken = await intraApi.getAccessToken(code);
  if (!accessToken) {
    return ctx.render(false);
  }
  const user = await intraApi.getUserData(accessToken);
  if (!user) {
    return ctx.render(false);
  }

  const players = await listPlayers(accessToken);
  if (!players) {
    return ctx.render(false);
  }
  return ctx.render({ user: user, players: players });
}

export default function Home(
  props: PageProps<Data>,
) {
  const { user, players } = props.data;
  return (
    <>
      {user && players
        ? <Dashboard user={user} players={players} />
        : <Login />}
    </>
  );
}
