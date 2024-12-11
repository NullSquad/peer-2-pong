import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/* 
  The matches collection will have the following fields:
  - competition: ObjectId
  - players: Array of objects with the following fields:
    - id: ObjectId
    - score: Number
  - date: Date
  - reportedBy: ObjectId
  - status:
      default: "Ready to play"
      after submit: "Waiting for confirmation"
      after accepting score: "Finished"
      after denying score: "Ready to play"
*/

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("matches");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading matches");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("matches");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading match");
  }
});

router.get("/competition/:id", async (req, res) => {
  try {
    let collection = await db.collection("matches");
    let query = { competition: new ObjectId(req.params.id) };
    let results = await collection.find(query).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading matches");
  }
});

router.post("/", async (req, res) => {
  try {
    let match = {
      competition: new ObjectId(req.body.competition),
      players: req.body.players.map((player) => ({
        id: new ObjectId(player.id),
        score: player.score,
      })),
      date: new Date(),
      reportedBy: null,
      // if reportedBy is null, the match is not yet reported
      // if reportedBy is not null, the match is reported
      // and the value is the id of the user who reported it
      // 3 status values: "reported", "confirmed", "pending"
      status: "pending",
    };
    let collection = await db.collection("matches");
    let result = await collection.insertOne(match);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding match");
  }
});

// submit button: updates (patch) status, score, reporter. If the status is waiting, nothing changes
// accept score: updates date (is the date when the match ends), and status (finished)
// deny score: updates status (set -> to play), score (when deny -> set to 0)
// to debate: should back give player num info to frontend,  (each player should see themselves as player 1 on the left)
/*
  - status:
      default: "Ready to play"
      after submit: "Waiting for confirmation" -> update status, score and reporter
      after accepting score: "Finished" -> update date and status
      after denying score: "Ready to play"
*/
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {};
    if (req.body.status === "Waiting for confirmation") {
      updates = {
        $set: {
          status: req.body.status,
          players: req.body.players.map((player) => ({
            id: new ObjectId(player.id),
            score: player.score,
          })),
          reportedBy: new ObjectId(req.body.reportedBy),
        },
      };
    } else if (req.body.status === "Finished") {
      updates = {
        $set: {
          status: req.body.status,
          date: new Date(),
        },
      };
    } else if (req.body.status === "Ready to play") {
      updates = {
        $set: {
          status: req.body.status,
          players: req.body.players.map((player) => ({
            id: new ObjectId(player.id),
            score: 0,
          })),
        },
      };
    }
    let collection = await db.collection("matches");
    let oldMatch = await collection.findOne(query);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating match");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("matches");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting match");
  }
});

export default router;
