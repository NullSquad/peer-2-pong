import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import userController from "./users.js";
import matchController from "./matches.js";

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
      competition.players = competition.players.map((p) => ({
        player_id: new ObjectId(p.player_id),
      }));
    return collection.insertOne(competition);
  },

  async update(id, updates) {
    if (updates.start_date) updates.start_date = new Date(updates.start_date);
    if (updates.end_date) updates.end_date = new Date(updates.end_date);
    if (updates.players)
      updates.players = updates.players.map((p) => ({
        player_id: new ObjectId(p.player_id),
      }));
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },

  async addPlayer(id, player) {
    await userController.add(player);
    return this.update(id, {
      $addToSet: { players: { player_id: new ObjectId(player.id) } },
    });
  },

  async getRanking(competitionId, playerId) {
    const competition = await this.getById(competitionId);
    if (!competition) throw new Error("Competition not found");

    const matches = await matchController.getByCompetition(competitionId);
    const points = competition.settings.points;

    const ranking = {};
    matches.forEach((match) => {
      const [player1, player2] = match.players;
      if (!ranking[player1.player_id]) ranking[player1.player_id] = 0;
      if (!ranking[player2.player_id]) ranking[player2.player_id] = 0;

      if (player1.score > player2.score) {
        ranking[player1.player_id] += points.winner;
        ranking[player2.player_id] += points.loser;
      } else if (player1.score < player2.score) {
        ranking[player1.player_id] += points.loser;
        ranking[player2.player_id] += points.winner;
      } else {
        ranking[player1.player_id] += points.tie;
        ranking[player2.player_id] += points.tie;
      }
    });

    const isParticipating = competition.players.some(
      (player) => player.player_id.toString() === userId.toString(),
    );

    return {
      ranking,
      isParticipating,
    };
  },
};

export default controller;
