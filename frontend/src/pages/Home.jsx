import MatchCard from "../components/MatchCard";

const Home = () => {
	const matches = [
		{
			player1: "bautrodr",
			player2: "sguzman",
			player1Img: "https://via.placeholder.com/150",
			player2Img: "https://via.placeholder.com/150",
			initialTime: 3 * 24 * 60 * 60, // 3 días en segundos
		},
		{
			player1: "jdoe",
			player2: "asmith",
			player1Img: "https://via.placeholder.com/150",
			player2Img: "https://via.placeholder.com/150",
			initialTime: 2 * 24 * 60 * 60, // 2 días en segundos
		},
	];

	return (
		<div className="min-h-screen bg-gray-800 text-white p-4">
			<h1 className="text-2xl font-bold mb-4">Matches</h1>
			<div className="space-y-4">
				<MatchCard
					player1={{ name: 'bautrodr', image: 'player1.jpg' }}
					player2={{ name: 'sguzman', image: 'player2.jpg' }}
					targetDate="2024-12-01T12:00:00"
				/>
			</div>
		</div>
	);
};

export default Home;
