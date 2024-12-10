import { Link } from "preact-router";
import Logo from "../assets/logo.svg";

const Login = () => {
  return (
    <main className="relative inset-0 w-full h-full bg-cover text-white min-h-screen bg-pattern flex flex-col items-center justify-center">
      <img
        src={Logo}
        alt="Peer 2 Pong app Logo"
        className="w-auto max-w-xs h-auto mb-6 fill-white"
      />
      <Link
        href="/api/auth/"
        className="bg-primary-yellow shadow-yellow-50-700 px-12 py-5 rounded-md text-white text-xl text-stroke border-2 border-black text-shadow tracking-tighter"
      >
        <h2>LOGIN</h2>
      </Link>
    </main>
  );
};

export default Login;
