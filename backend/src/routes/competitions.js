import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import { schedule_competition } from "../competitions_scheduling.js";

const router = express.Router();

/* 
  The competitions collection will have the following fields:
  - type: String (e.g. "League", "Tournament")

*/

// how many points do you win/lose when u win/lose/tie a match

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("competitions");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading competitions");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("competitions");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading competition");
  }
});

router.post("/", async (req, res) => {
  try {
		const actualDate = new Date();
		const myPlayers = [1, 2, 3, 4, 5, 6, 7, 8];
    let match = {
      type: req.body.type,
			startDate: actualDate,
      endDate: new Date(Date.now() + 60000),
			players: myPlayers.map(player => {return {player: new ObjectId(player), score: 0, active: true};}),
			settings: {
				frequency: {
					quantity: 30,
					unit: "second"
				},
				quantity: 3,
				points: {
					winner: 1,
					loser: -1,
					tie: 0
				}
			},
    };
		console.log(`\n\n\n${match}\n\n\n`);
    let collection = await db.collection("competitions");
    let result = await collection.insertOne(match);
		const	new_competition = await collection.findOne({startDate: actualDate});
		console.log(`\n\n\n${new_competition._id} && type: ${new_competition.type}\n\n\n`);
		// const	new_competition = await collection.findOne({});
		schedule_competition({competitionId: new_competition._id});
		result = "ok";
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding competition");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        type: req.body.type,
      },
    };

    let collection = await db.collection("competitions");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating competition");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("competitions");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting competition");
  }
});

export default router;
