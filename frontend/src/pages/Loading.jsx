import pacloader from "../assets/pacman.svg"

export const Loading = () => {
	return (
		<main className="bg-pattern bg-cover min-h-screen flex flex-col items-center justify-center">
		<img src={pacloader} alt="Pacman loader"/>
 </main>
	)
}
