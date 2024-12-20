import useAuth from "../hooks/useAuth";

export const Header = () => {
  const { user } = useAuth();
  return (
    <header
      className="relative bg-yellow-500 text-white py-1 px-5 sm:px-10 sm:ml-[-1%] ml-[-2%] w-[80%] sm:w-[50%] md: flex justify-between mb-4 
      items-center border-t-[8px] border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px] border-r-black shadow-md transform -skew-x-[8deg]"
    >
      <div className="transform skew-x-[8deg] flex items-center w-full">
        {/* Imagen del Avatar */}
        <img
          src={user.image}
          alt={`${user.login}'s avatar`}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-black mr-4 sm:mr-6 shadow-sm cursor-pointer"
        />
        {/* Eslogan */}
        <h1
          className="text-xl sm:text-2xl font-bold"
          style={{ WebkitTextStroke: "1px black", color: "white" }}
        >
          {user.login.toUpperCase()}
        </h1>
      </div>
    </header>
  );
};
