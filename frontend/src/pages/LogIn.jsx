import { Link } from "preact-router";

const LogIn = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Peer2Pong</h1>
      <Link to="/" className="bg-blue-500 px-4 py-2 rounded-lg text-white">
        LogIn
      </Link>
    </div>
  );
};

export default LogIn;
