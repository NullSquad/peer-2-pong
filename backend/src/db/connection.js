import { MongoClient } from "mongodb";
import UserSchema from "../models/User.json" assert { type: "json" };
import MatchSchema from "../models/Match.json" assert { type: "json" };
import CompetitionSchema from "../models/Competition.json" assert { type: "json" };

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

  await db.createCollection("matches", {
    validator: {
      $jsonSchema: MatchSchema,
    },
  });

  await db.createCollection("competitions", {
    validator: {
      $jsonSchema: CompetitionSchema,
    },
  }); d
} catch (err) {
  console.error(err);
}

export default db;
