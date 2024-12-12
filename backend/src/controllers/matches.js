import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("matches");

const controller = {
  async getAll() {
    return collection.find({}).toArray();
  },

  async getById(id) {
    return collection.findOne({ _id: new ObjectId(id) });
  },

  async getByCompetition(id) {
    return collection.find({ competition: new ObjectId(id) }).toArray();
  },

  async add(match) {
    return collection.insertOne(match);
  },

  async update(id, updates) {
    updates = { $set: updates };
    return collection.updateOne({ _id: new ObjectId(id) }, updates);
  },

  async report(match, reportedBy) {
    // if (match.status === "Ready to play") {
    //   const score = match.players.map((player) => player.score);
    //   if (score[0] !== 0 || score[1] !== 0) {
    //     match.status = "Waiting for confirmation";
    //     match.reportedBy = reportedBy;
    //   } else {
    //     throw new Error("Score must be different from 0-0");
    //   }
    // }
    // else if (match.status === "Waiting for confirmation") {
    //   if (match.reportedBy === reportedBy) {
    //     throw new Error("You cannot confirm your own score");
    //   }
    //   match.status = "Finished";
    // }
    return collection.findOneAndUpdate(
      { _id: new ObjectId(match._id) },
      { $set: match },
      { returnDocument: "after" },
    );
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },
};

export default controller;
