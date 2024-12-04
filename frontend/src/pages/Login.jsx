import { Link } from "preact-router";

const Login = () => {
  return (
	<main className="relative text-white inset-0 w-full min-h-screen bg-pattern pt-6 sm:pt-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Peer2Pong</h1>
      <Link href="/api/auth/">
        <button className="bg-primary-yellow px-8 shadow-yellow-100-700 py-2 rounded-lg text-white">
          Login
        </button>
      </Link>
    </main>
  );
};

export default Login;
