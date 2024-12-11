import {useState, useEffect } from "preact/hooks"
import { Separator } from "../components/Separator";


const Competition = ({id}) => {

	const [leaderboardData, setLeaderbordData] = useState([]);

	useEffect(() => {

		// we need to call the backend to ask for competition with id [id]
		const mockData = [
			{rank: 1, name : "player1", score: id},
			{rank: 3, name : "player2", score: id},
			{rank: 3, name : "player3", score: id}
		];

		setLeaderbordData(mockData);
	}, []);


	return (
    <div className="container w-screen h-screen">
		<Separator>Leaderboard</Separator>
		<div className="flex flex-col gap-4">
        {leaderboardData.map((player) => (
          <div
            key={player.rank}
            className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded shadow"
          >
            <span>#{player.rank}</span>
            <span>{player.name}</span>
            <span>{player.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competition;
