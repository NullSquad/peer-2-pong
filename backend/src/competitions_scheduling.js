import Agenda	from "agenda";
import humanInterval from "human-interval";
import db from "./db/connection.js";
import competitionController from "./controllers/competitions.js";
import matchController from "./controllers/matches.js";

const	agenda = new Agenda({mongo: db});


function	schedule_competition({competitionId})
{
	//const	competition = get_competition({competitionId});

	competitionController.getById(competitionId).then((competition) => {
		console.log(`\n\n\n${competition.settings.frequency.quantity} and ${competition.settings.frequency.unit} \n\n\n`);
		
		agenda.define("update competition matches", update_competitions);

		agenda.define("start league", (job) => {
			const	{ competitionId } = job.attr.data;
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
		
		agenda.define("start tournament", (job) => {
			const	{ competitionId } = job.attr.data;
			//const	competition = get_competition({competitionId});
		
			return ;
		});
		
		agenda.start();
		agenda.now(`start ${competition.type}`, {competitionId});
	});
	return ;
}

export {schedule_competition}

//Esto todavia no funsiona
function	update_competitions(job)
{
	const	{ competitionId } = job.attr.data;
	//const	competition = get_competition({competitionId});

	competitionController.getById(competitionId).then((competition) => {
		let		matches = [];
	
		check_outdated_matches(competition);
		matches = create_competition_matches(competition);
		matches.forEach(match => matchController.add({
				"players": match.players.map(player => {player}),
				"date": new Date(Date.now() + humanInterval(competition.frequency)),
				"status": match.length == 1 ? "finished" : "scheduled",
				"competition": competition.id
		}));
	});
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