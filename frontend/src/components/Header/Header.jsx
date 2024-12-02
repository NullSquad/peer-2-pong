import { h } from "preact";

export function Header({ user }) {
  return (
    <header className="relative bg-yellow-500 text-white py-1 px-5 my-5 ml-0 w-[60%] flex justify-between items-center border-t-4 border-yellow-200 border-b-4 border-orange-600 border-r-2 border-black shadow-md">
      <nav className="flex items-center">
        <img
          src={user.image}
          alt={`${user.login}'s avatar`}
          className="w-16 mr-6 h-16 rounded-full border-4 border-white mr-4 shadow-sm"
        />
        <h1 
          className="text-2xl font-bold"
          style={{ WebkitTextStroke: '2px black', color: 'white' }}
        >
          {user.login}
        </h1>
      </nav>
    </header>
  );
}
