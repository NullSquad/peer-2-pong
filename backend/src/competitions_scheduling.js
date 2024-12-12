import Agenda	from "agenda";
import humanInterval from "human-interval";
import db from "./db/connection.js";
import matchController from "./controllers/matches.js";
import { ObjectId } from "mongodb";
// import { agenda } from "./main.js";

// const mongoConnectionString = `${process.env.DB_URI}/agendaJobs` || "";
// console.log(`\n\n\n${mongoConnectionString}\n\n\n`);
const	agenda = new Agenda({mongo: db});


// const mongoConnectionString = `${process.env.DB_URI}/agenda` || "";
// const	agenda = new Agenda({db: {address: mongoConnectionString}});

function	get_competition({competitionId})
{
	const my_get_competition = async ({id}) => {
		const	query = { _id: new ObjectId(id) };
		const	competitions = await db.collection("competitions");
		const	competition = await competitions.findOne(query);

		console.log(`second: ${competition._id}`);
		return competition;
	}

	const result = my_get_competition({id: competitionId}).then((data) => {return data});
	
	console.log(`\n\n\nid: ${result._id}\n\n\n`);

	return result;
}

agenda.define("update competition matches", update_competitions);

agenda.define("start league", (job) => {
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});
	const	frequency = competition.settings.frequency;
	const	frequencyString = `${frequency.quantity} ${frequency.unit}${frequency.quantity != 1 ? 's' : ''}`;

	agenda.every(frequencyString, "update competition matches", {
		competitionId
	}, {
		endDate: competition.endDate
	});
	return ;
});

agenda.define("start tournament", (job) => {
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});

	return ;
});

agenda.start();

function	schedule_competition({competitionId})
{
	const	competition = get_competition({competitionId});

	agenda.schedule(competition.startDate, `start ${competition.type}`, {competitionId});
	return ;
}

export {schedule_competition}

//Esto todavia no funsiona
function	update_competitions(job)
{
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});
	let		matches = [];

	check_outdated_matches(competition);
	matches = create_competition_matches(competition);
	matches.forEach(match => matchController.add({
			"players": match.players.map(player => {player}),
			"date": new Date(Date.now() + humanInterval(competition.frequency)),
			"status": match.length == 1 ? "finished" : "scheduled",
			"competition": competition.id
	}));
	return ;
}

function	tie_match(match)
{
	return ;
}

function check_outdated_matches(competition)
{
	const	matches = competition.matches;

	matches.forEach(match => {
		if (match.status != "finished")
			tie_match(match)
	});
	return ;
}

const competition_matchmaking = {
	tournament: create_tournament_matches,
	league: create_league_matches
}

function create_tournament_matches(competition)
{
	return [];
}

function create_competition_matches(competition)
{
	return competition_matchmaking[competition.type](competition);
}

const leagues = {
	elite: 8,
	advanced: 16,
	rookie: Infinity
}

function create_league_matches(competition)
{
	const	players = competition.players.map(({player}) => player);
	const	quantity = competition.settings.quantity;
	let		matches = [];
	let		first_player = 0;
	let		competition_matches;

	for (rank of Object.values(leagues))
	{
		competition_matches = matchmaking(players.slice(first_player, rank), quantity);
		matches.push(competition_matches);
	}
	matches = matches.flat();
	return (matches);
}

function	matchmaking(players, quantity)
{
	const	amountMatches = Math.round(players * quantity / 2);
	let		matches = [];

	for (let i = 0; i < amountMatches; i++)
		matches.push([players[i % players.length], players[i + 1 % players.length]]);
	return matches;
}
