import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

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
    let match = {
      type: req.body.type,
    };
    let collection = await db.collection("competitions");
    let result = await collection.insertOne(match);
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
