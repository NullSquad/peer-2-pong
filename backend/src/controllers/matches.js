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

  async add(match) {
    return collection.insertOne(match);
  },

  async update(id, updates) {
    updates = { $set: updates };
    return collection.updateOne({ _id: new ObjectId(id) }, updates);
  },

  async report(match, reportedBy) {
    if (match.status === null) {
      const score = match.players.map((player) => player.score);
      if (score[0] !== 0 || score[1] !== 0) {
        match.status = false;
        match.reportedBy = reportedBy;
      }
      else {
        throw new Error("Score must be different from 0-0");
      }
    }
    return collection.findOneAndUpdate( { _id: new ObjectId(match._id) }, { $set: match }, { returnDocument: "after" });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },
};

export default controller;
