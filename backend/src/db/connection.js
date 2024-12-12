import { MongoClient } from "mongodb";
import UserSchema from "../models/User.json" assert { type: "json" };
import MatchSchema from "../models/Match.json" assert { type: "json" };

const URI = process.env.DB_URI || "";
const client = new MongoClient(URI);

let db;

try {
  await client.connect();
  db = client.db("database");
  await db.command({ ping: 1 });
  console.log("You successfully connected to MongoDB!");

  const collections = await db
    .listCollections()
    .toArray()
    .map((c) => c.name);

  if (!collections.includes("users")) {
    await db.createCollection("users", {
      validator: {
        $jsonSchema: UserSchema,
      },
    });
  }

  if (!collections.includes("matches")) {
    await db.createCollection("matches", {
      validator: {
        $jsonSchema: MatchSchema,
      },
    });
  }
} catch (err) {
  console.error(err);
}

export default db;
