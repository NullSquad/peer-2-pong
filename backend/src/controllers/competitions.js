import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("competitions");

const PlayerState = {
    Win: "winner",
    Lose: "loser",
    Tie: "tie"
}

const controller = {
  async getAll() {
    return collection.find({}).toArray();
  },

  async getById(id) {
    return collection.findOne({ _id: new ObjectId(id) });
  },

  async update(id, updates) {
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

  async updatePlayerScore(id, playerId, state) {
    const competition = await collection.findOne({ _id: new ObjectId(id) });
    const player = competition.players.find((p) => p.player.equals(new ObjectId(playerId)));

    if (!player)
        return ;
    player.score += competition.settings.points.get(state);
    competition.players = competition.players.map((p) => {
        if (p.player.equals(new ObjectId(playerId)))
            return player;
        return p;
    });
    this.update(id, { competition });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
};

export default controller;