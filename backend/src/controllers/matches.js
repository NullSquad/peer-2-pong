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
    match.competition_id = new ObjectId(match.competition_id);
    match.players = match.players.map((player) => ({
      ...player,
      player_id: new ObjectId(player.player_id),
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
    if (updates.date) updates.date = new Date(updates.date);
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },

  async getByCompetitionAndPlayer(competitionId, playerId) {
    return collection
      .aggregate([
        {
          $match: {
            competition_id: new ObjectId(competitionId),
            "players.player_id": new ObjectId(playerId),
          },
        },
        { $unwind: "$players" },
        {
          $lookup: {
            from: "users",
            localField: "players.player_id",
            foreignField: "_id",
            as: "playerDetails",
          },
        },
        {
          $addFields: {
            "players.email": { $arrayElemAt: ["$playerDetails.email", 0] },
            "players.login": { $arrayElemAt: ["$playerDetails.login", 0] },
            "players.image": { $arrayElemAt: ["$playerDetails.image", 0] },
            "players.campus": { $arrayElemAt: ["$playerDetails.campus", 0] },
          },
        },
        { $unset: "playerDetails" },
        {
          $group: {
            _id: "$_id",
            competition_id: { $first: "$competition_id" },
            date: { $first: "$date" },
            status: { $first: "$status" },
            players: { $push: "$players" },
          },
        },
        {
          $project: {
            _id: 1,
            competition_id: 1,
            date: 1,
            status: 1,
            players: 1,
          },
        },
      ])
      .toArray();
  },

  async report(id, userId, report) {
    const match = this.getById(id);
    if (!match) throw new Error("Match not found");
    this.update(id, match);
  },
};

export default controller;
