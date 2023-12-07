import { Button } from "../components/Button.tsx";

export function Login() {
  return (
    <main class="flex justify-center items-center h-screen text-gray-600">
      <div>
        <div class="mb-16 mx-8 text-center">
          <img
            class="h-24 mx-auto mb-6"
            src="/paletas2.svg"
            alt="Deno Logo"
          />
          <span class="block text-3xl font-bold text-black mb-3">
            Peer2Pong
          </span>
          <span class="block text-lg">
            Made By{"  "}
            <a
              class="font-bold underline"
              href="https://github.com/San-tito"
              rel="noopener noreferrer"
              target="_blank"
            >
              Santito
            </a>
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
