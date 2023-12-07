import { User } from "@/utils/users.ts";
import { deleteCookie } from "$std/http/cookie.ts";
import { Button } from "@/components/Button.tsx";

export function Header({ user }: { user: User }) {
  return (
    <header
      class="h-[110px] sm:!h-[144px] w-full bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: "url(/header_bg.svg)",
      }}
    >
      <div class="rainfall w-full h-full absolute" />
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex pt-4 items-center justify-between relative">
        <a href="/">
          <img
            src={user.avatarUrl}
            alt={user.userId}
            class="h-14 w-14 rounded-full shadow-xl shadow-red"
          />
        </a>
        <h1>
          <img
            src="/Peer2pong-02.svg"
            alt="Peer2Pong"
            class="h-42 w-42"
            width="140"
            height="60"
          />
        </h1>
        <Button
          href="/oauth/signout"
          class="hidden sm:flex"
          onClick={() => deleteCookie(res, "token")}
        >
          <img
            class="fill-current w-8 h-8 mr-2"
            src="/logo.svg"
            alt="42 Logo"
          />
          <span>Logout</span>
        </Button>
      </nav>
    </header>
  );
}
