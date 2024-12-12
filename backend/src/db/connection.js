import { MongoClient } from "mongodb";
import UserSchema from "../models/User.json" assert { type: "json" };

const URI = process.env.DB_URI || "";
const client = new MongoClient(URI);

let db;

try {
  await client.connect();
  db = client.db("database");
  await db.command({ ping: 1 });
  console.log("You successfully connected to MongoDB!");

  await db.createCollection("users", {
    validator: {
      $jsonSchema: UserSchema,
    },
  });
} catch (err) {
  console.error(err);
}

export default db;
