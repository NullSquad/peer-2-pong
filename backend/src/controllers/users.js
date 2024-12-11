import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("users");

const controller = {
    async getAll() {
        return await collection.find({}).toArray();
    },

    async getById(id) {
        return await collection.findOne({ _id: new ObjectId(id) });
    },

    async add(data) {
        data._id = new ObjectId(data._id);
        return await collection.insertOne(data);
    },

    async update(id, updates) {
        updates = { $set: updates };
        return await collection.updateOne({ _id: new ObjectId(id) }, updates);
    },

    async delete(id) {
        return await collection.deleteOne({ _id: new ObjectId(id) });
    },
};

export default controller;