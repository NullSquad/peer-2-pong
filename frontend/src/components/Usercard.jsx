export const Usercard = ({ name, picture }) => {
	return (
		<article className="bg-primary border-4 -skew-x-6 flex flex-col gap-4 w-4/5 h-full" >
			<div className="bg-primary-light w-full h-6"/>
			<div className="flex flex-row p-4 skew-x-6 gap-4">
				<img className="rounded-full border-4 w-14 sm:w-14 md:w-28 lg:w-32" src={picture}/>
				<h2 className="p-4 flex items-center justify-center text-2xl sm:text-2xl md:text-3xl lg:text-5xl" > {name} </h2>
			</div>
			<div className="bg-primary-dark w-full h-6"/>
		</article>
	);	
}
