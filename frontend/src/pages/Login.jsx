import { Link } from "preact-router/match";
import Logo from "../assets/logo.svg";

const Login = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <img 
        src={Logo} 
        alt="Peer 2 Pong app Logo" 
        className="w-auto max-w-xs h-auto mb-6"
	    />
      <Link href="/api/auth/" className="bg-primary-yellow shadow-yellow-50-700 px-12 py-5 rounded-sm text-white text-2xl text-stroke drop-shadow tracking-tighter font-bold">
          <h2>LOGIN</h2>
      </Link>
    </main>
  );
};

export default Login;
