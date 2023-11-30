import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { listPlayers, Player } from "@/utils/players.ts";
import { User } from "@/utils/users.ts";
import { intraApi } from "@/communication/intra.ts";
import { Dashboard } from "@/components/Dashboard.tsx";
import { Login } from "@/components/Login.tsx";

type Data = {
  user: User;
  players: Player[];
};

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const maybeAccessToken = getCookies(req.headers)["token"];
  if (maybeAccessToken) {
    const user = await intraApi.getUserData(maybeAccessToken);
    const players = await listPlayers(maybeAccessToken);
    if (user) {
      return ctx.render({ user: user, players: players });
    }
  }
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
  const response = await ctx.render({ user: user });
  setCookie(response.headers, {
    name: "token",
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  return response;
}

export default function Home(
  props: PageProps<Data>,
) {
  const { user, players } = props.data;
  return (
    <>
      {user && players ? <Dashboard user={user} players={players} /> : <Login />}
    </>
  );
}
