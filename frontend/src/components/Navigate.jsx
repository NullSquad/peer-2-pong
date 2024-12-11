import { Link } from "preact-router";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="px-3">Home</Link>
        <Link href="/leaderboard" className="px-3">Leaderboard</Link>
        <Link href="/login" className="px-3">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

