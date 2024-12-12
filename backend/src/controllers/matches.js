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
      score: player.score ?? null,
      reported: player.reported ?? false,
    }));
    match.status = match.status ?? "scheduled";
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
    return collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" },
    );
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },

  async getMyMatchesByCompetition(userId, competitionId) {
    const matches = await collection
      .find({
        competition: new ObjectId(competitionId),
        "players.player": new ObjectId(userId),
      })
      .toArray();

    return matches.map((match) => {
      const userPlayer = match.players.find((p) =>
        p.player.equals(new ObjectId(userId)),
      );
      if (userPlayer && !userPlayer.reported) match.status = "pending";
      return match;
    });
  },

  async report(id, userId, report) {
    const index = report.players.findIndex((p) =>
      p.player.equals(new ObjectId(userId)),
    );
    if (index === -1) throw new Error("Player not found");

    if (
      report.score[0] === report.score[1] ||
      report.score[0] < 0 ||
      report.score[1] < 0
    )
      throw new Error("Invalid score");

    report.players[index].reported = true;
    report.status = "reported";

    return this.update(id, report);
  },

  async confirm(id, userId, confirm) {
    const index = confirm.players.findIndex((p) =>
      p.player.equals(new ObjectId(userId)),
    );
    if (index === -1) throw new Error("Player not found");

    if (confirm) {
      confirm.status = "confirmed";
      confirm.date = new Date();
      // update competition score here
    } else {
      confirm.status = "scheduled";
      confirm.players.forEach((player) => (player.reported = false));
    }

    return this.update(id, confirm);
  },
};

export default controller;
