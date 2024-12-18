import Agenda	from "agenda";
import humanInterval from "human-interval";
import db, {dbClient} from "./db/connection.js";
import competitionController from "./controllers/competitions.js";
import matchController from "./controllers/matches.js";
import { ObjectId } from "mongodb";

// await dbClient.connect();
// const	agenda = new Agenda({mongo: dbClient.db("agendaDB"), processEvery: "5 seconds"});
// const mongoConnectionString = 'mongodb://user:pass/agenda';
const mongoConnectionString = process.env.DB_URI;

const agenda = new Agenda({ db: { address: mongoConnectionString }, processEvery: "5 seconds"});

agenda.define("update competition matches", update_competitions);

agenda.define("start league", async (job) => {
	const	{ competitionId } = job.attrs.data;
	console.log(`\n\n\n${competitionId}\n\n\n`);
	//const	competition = get_competition({competitionId});
	competitionController.getById(competitionId).then((competition) => {
		const	frequency = competition.settings.frequency;
		const	frequencyString = `${frequency.quantity} ${frequency.unit}${frequency.quantity != 1 ? 's' : ''}`;

		console.log(`\n\n\nfrequency: ${frequencyString}\n\n\n`);
		agenda.every(frequencyString, "update competition matches", {
			competitionId
		}, {
			endDate: competition.endDate
		});
	});
	return ;
});

agenda.define("start tournament", async (job) => {
	const	{ competitionId } = job.attrs.data;
	const competition = await competitionController.getById(competitionId);

	return ;
});

//Testing Agenda
agenda.define(`update matches`, async (job) => {
	const	{ competitionId } = job.attrs.data;
	const competition = await competitionController.getById(competitionId);
	const	frequency = competition.settings.frequency;
	const	frequencyString = `${frequency.quantity} ${frequency.unit}${frequency.quantity != 1 ? 's' : ''}`;

	console.log(`Creating match: ${competitionId}\n`);
	await matchController.add({
			"players": [{player_id: 1}, {player_id: 2}],
			"date": new Date(Date.now() + humanInterval(frequencyString)),
			"status": "scheduled",
			"competition_id": competition._id
	});
	return ;
});

agenda.define("delete update matches", async (job) => {
	const	{ competitionId } = job.attrs.data;

	await agenda.cancel({name: "update matches", data: { competitionId: competitionId }});
	return ;
});

agenda.define("start league", async (job) => {
	const	{ competitionId } = job.attrs.data;
	const competition = await competitionController.getById(competitionId);
	const	frequency = competition.settings.frequency;
	const	frequencyString = `${frequency.quantity} ${frequency.unit}${frequency.quantity != 1 ? 's' : ''}`;

	// console.log(`\n\n\nfrequency: ${frequencyString} and end\n\n\n`);
	await agenda.create(`update matches`, {competitionId})
		.unique({"data.competitionId": competitionId}, {insertOnly: true})
		.repeatEvery(frequencyString, {timezone: "Europe/Madrid"})
		.save();
	await agenda.create("delete update matches", {competitionId})
		.unique({"data.competitionId": competitionId})
		.schedule(competition_last_day_date(competition.days, competition.settings.frequency), {timezone: "Europe/Madrid"})
		.priority('low')
		.save();
	return ;
});

agenda.start();

agenda.on("ready", () => {console.log("Agenda connected successfully to db")});
agenda.on("error", (err) => {console.log("fuck some error happended while trying connect to db: ", error)});

async function	schedule_competition({competitionId})
{
	const competition = await competitionController.getById(competitionId);

	agenda.create(`start ${competition.type}`, {competitionId})
		.unique({"data.competitionId": competitionId})
		.schedule(competition.start_date, {timezone: "Europe/Madrid"})
		.save();
	return ;
}
//

export {schedule_competition}

function	get_frequency_string(frequency)
{
	return ;
}

function	competition_last_day_date(days, frequency)
{
	return new;
}

//Esto todavia no funsiona
async function	update_competitions(job)
{
	const	{ competitionId } = job.attrs.data;
	const competition = await competitionController.getById(competitionId);
	let		matches = [];

	check_outdated_matches(competition);
	matches = create_competition_matches(competition);
	matches.forEach(async match => await matchController.add({
			"players": match.players.map(player => {player}),
			"date": new Date(Date.now() + humanInterval(competition.frequency)),
			"status": match.length == 1 ? "finished" : "scheduled",
			"competition": competition.id
	}));
	return ;
}

function	tie_match(match)
{
	matchController.update(match);
	return ;
}

function check_outdated_matches(competition)
{
	const	matches = competitionController.getMatchesOfCompetition(competition._id);

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
