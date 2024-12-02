import { h } from "preact";

export function Header({ user }) {
  return (
    // <header className="absolute bg-yellow-500 text-white py-1 px-5 my-10 ml-0 w-[50%] flex justify-between items-center border-t-4 border-yellow-200 border-b-4 border-orange-600 border-r-2 border-black shadow-md">
      <header className="fixed top-10 left-0 bg-yellow-500 text-white py-2 px-5 w-[70%] flex justify-between items-center border-t-4 border-yellow-200 border-b-4 border-orange-600 border-r-2 border-black shadow-md z-50">
      <nav className="flex items-center">
        {/* Imagen del Avatar */}
        <img
          src={user.image}
          alt="avatar"
          className="w-16 h-16 rounded-full border-4 border-white mr-4 shadow-sm"
        />
        {/* Eslogan */}
        <h2 className="text-2xl font-bold -webkit-text-stroke-2 -webkit-text-stroke-black">
          Slogan Campaña
        </h2>
      </nav>
    </header>
  );
}
