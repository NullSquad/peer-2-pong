import { Button } from "../components/Button.tsx";

export function Login() {
  return (
    <main class="flex justify-center items-center h-screen bg-foreground">
      <div>
        <div class="mb-22 mx-8 text-center">
         <img
            src="/Peer2pong-02.svg"
            alt="Peer2Pong"
            class="h-96 mx-auto mb-6 transition hover:skew-y-3 duration-700"
          />  
          <span class="block text-lg">
            Maded By{"  "}
            <a
              class="font-bold hover:text-red hover:underline hover:animate-pulse"
              href="https://github.com/San-tito"
              rel="noopener noreferrer"
              target="_blank"
            >
              Santito
            </a>{" "}
and{" "}
	 <a
              class="font-bold hover:text-orange hover:underline hover:animate-pulse"
              href="https://github.com/Droied4"
              rel="noopener noreferrer"
              target="_blank"
         >
              Droied 
            </a>
          </span>
        </div>
        <div class="flex justify-center items-center flex-col filter hover:invert">
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
