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
    return collection.find({ competition_id: new ObjectId(id) }).toArray();
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
        player_id: new ObjectId(player.player_id),
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
            as: "player",
          },
        },
        {
          $addFields: {
            "players.email": { $arrayElemAt: ["$player.email", 0] },
            "players.login": { $arrayElemAt: ["$player.login", 0] },
            "players.image": { $arrayElemAt: ["$player.image", 0] },
            "players.campus": { $arrayElemAt: ["$player.campus", 0] },
          },
        },
        { $unset: "player" },
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
          $set: {
            status: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ["$status", "reported"] },
                    {
                      $in: [new ObjectId(playerId), "$players.player_id"],
                    },
                    {
                      $eq: [
                        {
                          $arrayElemAt: [
                            "$players.reported",
                            {
                              $indexOfArray: [
                                "$players.player_id",
                                new ObjectId(playerId),
                              ],
                            },
                          ],
                        },
                        true,
                      ],
                    },
                  ],
                },
                then: "pending",
                else: "$status",
              },
            },
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
    if (!report.every((r) => r.score >= 0 && r.score <= 11)) {
      throw new Error(
        "Invalid scores in the report. Scores must be between 0 and 11.",
      );
    }
    return this.update(id, {
      players: report.map((r) => ({
        player_id: r.player_id,
        score: r.score,
        reported: r.player_id.toString() === userId.toString(),
      })),
      status: "reported",
    });
  },

  async confirm(id, userId, confirmation) {
    console.log(confirmation, id)
    if (confirmation) {
      return this.update(id, { status: "confirmed" });
    } else {
      return this.update(id, { status: "scheduled" });
    }
  },
};

export default controller;
