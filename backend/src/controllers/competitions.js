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
    competition.players = competition.players.map((p) => ({ player: new ObjectId(p.player), score: 0 }));
    return collection.insertOne(competition);
  },

  async update(id, updates) {
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
      { $unwind: "$players" },
      { $lookup: { from: "users", localField: "players.player", foreignField: "_id", as: "player" } },
      { $unwind: "$player" },
      { $match: { "player._id": new ObjectId(userId) } },
      { $project: { _id: 1, name: 1, players: 1 } }
    ]).toArray();
  }
};

export default controller;