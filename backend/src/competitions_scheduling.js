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

//Testing Agenda
agenda.define(`perform next day`, async (job) => {
	const	{ competitionId } = job.attrs.data;
	const competition = await competitionController.getById(competitionId);

	// check_outdated_matches(competition);
	console.log("\n\nperform in\n\n");
	try
	{
		create_competition_matches(competition);
	}
	catch (e)
	{
		console.log(e);
	}
	return ;
});

agenda.define("delete perform next day", async (job) => {
	const	{ competitionId } = job.attrs.data;

	await agenda.cancel({name: "perform next day", data: { competitionId: competitionId }});
	return ;
});

agenda.define("start league", async (job) => {
	const	{ competitionId } = job.attrs.data;
	const competition = await competitionController.getById(competitionId);

	await agenda.create(`perform next day`, {competitionId})
		.unique({"data.competitionId": competitionId}, {insertOnly: true})
		.repeatEvery(get_frequency_string(competition.settings.frequency), {timezone: "Europe/Madrid"})
		.save();
	await agenda.create("delete perform next day", {competitionId})
		.unique({"data.competitionId": competitionId})
		.schedule(competition_last_day_date(competition.days, competition.settings.frequency), {timezone: "Europe/Madrid"})
		.priority('low')
		.save();
	return ;
});

agenda.start();

agenda.on("ready", () => {console.log("Agenda connected successfully to db")});
agenda.on("error", () => {console.log("fuck some error happended while trying connect to db")});

async function	schedule_competition({competitionId})
{
	const competition = await competitionController.getById(competitionId);

	await agenda.create(`start ${competition.type}`, {competitionId})
		.unique({"data.competitionId": competitionId})
		.schedule(competition.start_date, {timezone: "Europe/Madrid"})
		.save();
	return ;
}
//

export {schedule_competition}

function	get_frequency_string(frequency)
{
	return (`${frequency.quantity} ${frequency.unit}${frequency.quantity != 1 ? 's' : ''}`);
}

function	competition_last_day_date(days, frequency)
{
	return new Date(Date.now() + days * humanInterval(get_frequency_string(frequency)));
}

//Esto todavia no funsiona
function	tie_match(match)
{
	// matchController.update(match);
	return ;
}

function check_outdated_matches(competition)
{
	const	matches = matchController.getByCompetition(competition._id);

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
	console.log(`\n\ncreate competition\n\n`);
	const	matches = competition_matchmaking[competition.type](competition);

	console.log(`\n\nMATCHES: ${matches}\n\n`);
	matches.forEach(async players => {
		let	match = {
			"players": players.map(player_id => ({player_id})),
			"date": new Date(Date.now() + humanInterval(get_frequency_string(competition.settings.frequency))),
			"competition_id": competition._id
		};

		console.log(`players: ${players}\n`);
		if (players.length == 1)
		{
			Object.assign(match.players[0], {score: 11, reported: true});
			match.players.push({player_id: -1});
			match.status = "confirmed";
		}
		await matchController.add(match);
		return ;
	});
	return ;
}

const leagues = {
	elite: 8,
	advanced: 16,
	rookie: Infinity
}

function create_league_matches(competition)
{
	const	players = competition.players.map(({player_id}) => player_id);
	const	quantity = competition.settings.quantity;
	let		matches = [];
	let		first_player = 0;
	let		competition_matches;

	console.log("\n\ncreate league matches\n\n");
	for (let rank of Object.values(leagues))
	{
		console.log(`\n\nprev matchmaking\n\n`);
		competition_matches = matchmaking(players.slice(first_player, rank), quantity);
		matches.push(competition_matches);
		console.log(`\n\nrank == ${rank}\n\n`);
	}
	console.log(`\nmatches: ${matches}\n`);
	matches = matches.flat();
	return (matches);
}

function	matchmaking(players, quantity)
{
	const	realAmountMatches = players.length * quantity / 2;
	const	amountMatches = Math.round(realAmountMatches);
	let		matches = [];
	let		i;

	console.log(`\namount matches: ${amountMatches}\n`);
	for (i = 0; i < amountMatches; i++)
		matches.push([players[i % players.length], players[i + 1 % players.length]]);
	if (realAmountMatches != amountMatches)
		matches.push([players[i % players.length]]);
	return matches;
}
