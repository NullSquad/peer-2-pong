import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("users");

const controller = {
  async getAll() {
    return collection.find({}).toArray();
  },

  async getById(id) {
    return collection.findOne({ _id: new ObjectId(id) });
  },

  async add(user) {
    user._id = new ObjectId(user._id);
    return collection.insertOne(user);
  },

  async update(id, updates) {
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  },

  async delete(id) {
    return collection.deleteOne({ _id: new ObjectId(id) });
  },
};

export default controller;
