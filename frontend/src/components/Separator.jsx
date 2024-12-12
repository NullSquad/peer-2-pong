import useAuth from "../hooks/useAuth";

export const Separator = ({ children }) => {
  const { user } = useAuth();
return (
	<header className="relative my-6 mb-10 ">
	{/* Elemento principal (siempre encima) */}
	<div 
		className="absolute z-20 bg-yellow-500 text-white sm:mt-15 py-1 px-5 sm:px-10 sm:ml-[-1%] ml-[-2%] w-[50%] sm:w-[35%] xl:w-[20%] flex justify-end
		border-t-[8px] border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px] border-r-black shadow-md transform -skew-x-[8deg]">
		<h2 className="text-xl sm:text-2xl font-bold skew-x-[8deg] "
		style={{ WebkitTextStroke: '1px black', color: 'white' }}>
			{children.toUpperCase()}
		</h2>
	</div>

	{/* Elementos secundarios (detrás del principal) */}
	<div 
		className="relative z-10 bg-yellow-500 text-white py-1.5 px-5 sm:px-10 sm:ml-[-1%] ml-[-2%] w-[80%] sm:w-[60%] xl:w-[40%] flex justify-between 
		items-center border-t-[8px] border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px] border-r-black shadow-md transform -skew-x-[8deg]"
	></div>
	<div 
		className="relative z-0 bg-yellow-500 text-white py-1.5 px-5 sm:px-10 sm:ml-[-1%] ml-[-2%] w-[65%] sm:w-[45%] xl:w-[30%] flex justify-between 
		items-center border-t-[8px] border-t-yellow-50 border-b-[8px] border-b-yellow-700 border-r-[4px] border-r-black shadow-md transform -skew-x-[8deg]"
	></div>
	</header>
);};
