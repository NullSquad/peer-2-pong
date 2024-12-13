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
    match.competition = new ObjectId(match.competition);
    match.players = match.players.map((player) => ({
      ...player,
      player: new ObjectId(player.player),
      score: player.score ?? 0,
      reported: player.reported ?? false,
    }));
    match.status = match.status ?? "scheduled";
    match.date = new Date(match.date);
    return collection.insertOne(match);
  },

  async update(id, updates) {
    if (updates.competition)
      updates.competition = new ObjectId(updates.competition);
    if (updates.players)
      updates.players = updates.players.map((player) => ({
        ...player,
        player: new ObjectId(player.player),
      }));
    if (updates.date)
      updates.date = new Date(updates.date);
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },

  async report(id, userId, report) {
    const match = this.getById(id);
    if (!match) throw new Error("Match not found");
    this.update(id, match);
  },
};

export default controller;
