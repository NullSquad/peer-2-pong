import express from "express";

import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: ObjectId.createFromTime(req.params.id) }; 
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  try {
    let user = {
      _id: ObjectId.createFromTime(req.body.id),
      email: req.body.email,
      login: req.body.login,
      image: req.body.image,
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(user);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId.createFromTime(req.params.id) };
    const updates = {
      $set: {
        email: req.body.email,
        login: req.body.login,
        image: req.body.image,
      },
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId.createFromTime(req.params.id) };

    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
