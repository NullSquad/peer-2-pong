export const Usercard = ({ name, picture }) => {
	return (
		<article className="bg-primary border-4 flex flex-col -skew-x-6" >
			<div className="p-4 skew-x-6">
				<img className="flex flex-row rounded-full border-4 w-14 sm:w-14 md:w-28 lg:w-40" src={picture}/>
			</div>
			<h2 className="p-4 flex flex-row items-center justify-center text-2xl sm:text-2xl md:text-3xl lg:text-5xl" > {name} </h2>
		<div className="bg-primary-dark flex flex-col">
		si
		</div>
		</article>
	);	
}
