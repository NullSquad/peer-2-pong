import Agenda	from "agenda";
import db from "./db/connection";

const mongoConnectionString = `${process.env.DB_URI}/agenda` || "";
const	agenda = new Agenda({db: {address: mongoConnectionString}});

agenda.define("update competition matches", update_competitions);

agenda.define("start competition", (job) => {
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});

	agenda.every(competition.settings.frequency, "update competition matches", {competitionId});
	return ;
});

agenda.define("end competition", (job) => {
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});

	// agenda.jobs({"update competition matches", }).then(data);
	return ;
});

function	get_competition({competitionId})
{
  const	query = { _id: new ObjectId(competitionId) };
	const	competitions = db.collection("competitions")
												.then(data => data.findOne(query)
													.then(data));

	return (competitions);
}

function	schedule_competition({competitionId})
{
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});

	agenda.schedule(competition.startDate, "start competition", {competitionId});
	agenda.schedule(competition.endDate, "finish competition", {competitionId});
	return ;
}

//Esto todavia no funsiona
function	update_competitions(job)
{
	const	{ competitionId } = job.attr.data;
	const	competition = get_competition({competitionId});
	let		matches;

	check_outdate_matches(competition);
	matches = create_competition_matches(competition);
	matches.forEach(match => db.insertOne({
			"match": {
					"players": {...match},
					"Date": new Date(today + competition.frequency),
					"status": match.length == 1 ? "finished" : "to play",
					"reporter": null,
					"competition": competition.id                  
			}
	}));
}

function check_outdate_matches(competition)
{
   matches = getCompetitionMatches(competition)

	for (match in matches)
	{
		if (match.status != "finished")
			tie_match(match)
	}
}

const competition_matchmaking = {
	"tournament": create_tournament_matches,
	"league": create_league_matches
}

function create_tournament_matches(competition)
{
	return ; 
}

function create_competition_matches(competition)
{
	players = getCompetitionPlayers(competition)    
	return competition_matchmaking[competition.type](competition) 
}

const leagues = {
	"elite": 8,
	"advanced": 16,
	"rookie": -1
}

function create_league_matches(competition)
{
	let	matches = [];
	let	first_player = 0;

	for (rank in Object.values(leagues))
	{
		competition_matches = create_new_matches(players.slice(first_player, rank), competition.quant);
		matches.push(competition_matches);
	}
	return (matches);
}

const freepoints_user = "FREEPOINTS"

function  create_new_matches(players)
{
	letmatches = matchmaking(players);

	if (matches[-1].length == 1)
		matches[-1].push(freepoints_user)
	return (matches);
}
