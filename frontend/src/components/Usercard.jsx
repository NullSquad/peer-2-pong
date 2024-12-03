export const Usercard = ({ name, picture }) => {
	return (
		<article className="bg-primary border-4 -skew-x-12 flex flex-col w-4/5 h-full rounded-lg" >
			<div className="bg-primary-light w-full h-3 lg:h-5"/>
			<div className="flex flex-row p-4 skew-x-12 gap-4">
				<img className="rounded-full shadow shadow-black border-4 w-14 sm:w-14 md:w-28 lg:w-32" src={picture}/>
				<h2 className="p-4 flex items-center justify-center text-4xl sm:text-4xl md:text-5xl lg:text-7xl" > {name} </h2>
			</div>
			<div className="bg-primary-dark w-full h-3 lg:h-5"/>
		</article>
	);	
}
