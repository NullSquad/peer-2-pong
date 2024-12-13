import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("competitions");

const controller = {
  async getAll() {
    return collection.find({}).toArray();
  },

  async getById(id) {
    return collection.findOne({ _id: new ObjectId(id) });
  },

  async add(competition) {
    if (competition.start_date)
      competition.start_date = new Date(competition.start_date);
    if (competition.end_date)
      competition.end_date = new Date(competition.end_date);
    if (competition.players)
      competition.players = competition.players.map((p) => ({ player: new ObjectId(p.player), score: 0 }));
    return collection.insertOne(competition);
  },

  async update(id, updates) {
    if (updates.start_date) updates.start_date = new Date(updates.start_date);
    if (updates.end_date) updates.end_date = new Date(updates.end_date);
    if (updates.players) updates.players = updates.players.map((p) => ({ player: new ObjectId(p.player), score: p.score }));
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },

  async join(id, userId) {
    return collection.updateOne({ _id: new ObjectId(id) }, { $push: { players: { player: new ObjectId(userId), score: 0 } } });
  },

  async getMatchesOfUser(id, userId) {
    return collection.aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $unwind: "$matches" },
    ]).toArray();
  }
};

export default controller;