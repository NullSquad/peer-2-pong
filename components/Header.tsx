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
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex items-center justify-between relative">
        <a href="/">
          <img
            src={user.avatarUrl}
            alt={user.userId}
            class="h-14 w-14"
          />
        </a>
        <h1>
          <img
            src="/text_logo.svg"
            alt="Deno Merch"
            class="h-6"
            width="130"
            height="24"
          />
        </h1>
        <Button
          href="/oauth/signout"
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
