import { Button } from "../components/Button.tsx";

export function Login() {
  return (
    <main class="flex justify-center items-center h-screen text-gray-600">
      <div>
        <div class="mb-16 mx-8 text-center">
          <img
            class="h-24 mx-auto mb-6"
            src="/logo.svg"
            alt="Deno Logo"
          />
          <span class="block text-3xl font-bold text-black mb-3">
            Peer2Pong
          </span>
          <span class="block text-lg -mb-1.5">
            peer2pong demo test.
          </span>
          <span class="block text-lg">
            It uses{" "}
            <a
              class="font-bold underline"
              href="https://fresh.deno.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Fresh
            </a>
            {" + "}
            <a
              class="font-bold underline"
              href="https://supabase.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Supabase
            </a>
            {" + "}
            <a
              class="font-bold underline"
              href="https://twind.dev/"
              rel="noopener noreferrer"
              target="_blank"
            >
              twind
            </a>
            {" + "}
            <a
              class="font-bold underline"
              href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API"
              rel="noopener noreferrer"
              target="_blank"
            >
              Broadcast Channel API
            </a>{" "}
            on Deno Deploy.
          </span>
        </div>
        <div class="flex justify-center items-center flex-col">
          <Button
            href="/oauth/signin"
            onClick={() => deleteCookie(res, "token")}
          >
            <img
              class="fill-current w-8 h-8 mr-2"
              src="/logo.svg"
              alt="42 Logo"
            />
            <span>Login</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
