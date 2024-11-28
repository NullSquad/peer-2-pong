import { Link } from "preact-router/match";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Peer2Pong</h1>
      <Link activeClassName="active" href="/api/auth">
        <button className="bg-primary px-8 py-2 rounded-lg text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Login;
