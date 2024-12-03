

export const Usercard = ({ name, picture }) => {
	return (
		<article className="flex flex-row w-4/5 h-2/6 rounded-lg">
			<article className="object-conver bg-primary border-y-4 border-l-4 flex flex-col w-1/6 h-full rounded-lg">	
					<div className="bg-primary-light w-full h-3 lg:h-5"/>
					<div className="flex flex-row p-2">
						<img className="rounded-full shadow shadow-black border-4 size-4/6" src={picture}/> 
					</div>
					<div className="bg-primary-dark w-full h-3 lg:h-5"/>
			</article>
			<article className="object-cover bg-primary border-y-4 border-r-4 -skew-x-12 flex flex-col w-5/6 h-full rounded-lg">
				<div className="bg-primary-light w-full h-3 lg:h-5"/>
				<div className="flex flex-row p-2 skew-x-12 ">
					<h2 className="flex items-center justify-center text-1xl sm:text-4xl md:text-5xl lg:text-6xl" > {name} </h2>  
				</div>
				<div className="bg-primary-dark w-full h-3 lg:h-5"/>
			</article>
		</article>
	);	
}
