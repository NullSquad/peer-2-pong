import {useState, useEffect } from "preact/hooks"
import { Separator } from "../components/Separator";
import  LeaderboardTable  from "../components/LeaderboardTable";

const Competition = () => {

	return (
    <main className="container w-screen h-screen min-w-max">
		<Separator>Leaderboard</Separator>
		<LeaderboardTable />
    </main>
  );
};

export default Competition;
