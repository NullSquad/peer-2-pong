import { Link } from "preact-router/match";
import Logo from "../assets/logo.svg";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
    <img
		src={Logo}
		alt="Peer 2 Pong Logo"
		className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto mb-6" // Ajustar el tamano de la imagen
	  />
      <Link activeClassName="active" href="/api/auth/">
        <button className="bg-primary-yellow px-8 shadow-yellow-100-700 py-2 rounded-lg text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Login;
