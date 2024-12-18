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
		console.log(`date:\n\nstart: ${competition.start_date}\nend: ${competition.end_date}\n`);
    if (competition.start_date)
      competition.start_date = new Date(competition.start_date);
    if (competition.end_date)
      competition.end_date = new Date(competition.end_date);
    if (competition.players)
      competition.players = competition.players.map((p) => ({ player: new ObjectId(p.player), score: 0 }));
		console.log(`date:\n\nstart: ${competition.start_date}\nend: ${competition.end_date}\n`);
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
    return db.collection("matches").aggregate([
      { $match: { competition_id: new ObjectId(id) } },
      { $unwind: "$players" },
      { $match: { "players.player_id": new ObjectId(userId) } },
      { $project: { _id: 1, competition_id: 1, status: 1, date: 1, players: 1 } },
    ]).toArray();
  },

  async	getMatchesOfCompetition(id) {
    return db.collection("matches").find({ competition_id: new ObjectId(id) }).toArray();
	}

};

export default controller;
