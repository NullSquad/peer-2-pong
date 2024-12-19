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
    if (competition.players)
      competition.players = competition.players.map((p) => ({
				player_id: new ObjectId(p.player_id)
			}));
    const result = await collection.insertOne(competition);

		return result;
  },

  async update(id, updates) {
    if (updates.start_date)
			updates.start_date = new Date(updates.start_date);
    if (updates.players)
			updates.players = updates.players.map((p) => ({
				player_id: new ObjectId(p.player_id)
			}));

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });

		return result;
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },

  async join(id, userId) {
    return collection.updateOne({ _id: new ObjectId(id) }, { $push: { players: { player_id: new ObjectId(userId) } } });
  },

  async getMatchesOfUser(id, userId) {
    return db.collection("matches").aggregate([
      { $match: { competition_id: new ObjectId(id) } },
      { $unwind: "$players" },
      { $match: { "players.player_id": new ObjectId(userId) } },
      { $project: { _id: 1, competition_id: 1, status: 1, date: 1, players: 1 } },
    ]).toArray();
  }

};

export default controller;
