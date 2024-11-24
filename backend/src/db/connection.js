import { MongoClient } from "mongodb";

const URI = process.env.DB_URI || "";
const client = new MongoClient(URI);

try {
  await client.connect();
  console.log("You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("database");

export default db;