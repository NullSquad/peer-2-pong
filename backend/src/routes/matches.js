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
  - status: String (e.g. "Pending", "Confirmed", "Reported")
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

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {

      },
    };

    let collection = await db.collection("matches");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
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
