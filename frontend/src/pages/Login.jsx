import { Link } from "preact-router";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Peer2Pong</h1>
      <Link href="/auth/">
        <button className="bg-primary-yellow px-8 shadow-yellow-100-700 py-2 rounded-lg text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Login;
