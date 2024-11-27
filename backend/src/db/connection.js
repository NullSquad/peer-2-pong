// import { MongoClient } from "mongodb";

// const URI = process.env.DB_URI;
// if (!URI) {
//   throw new Error("La variable de entorno DB_URI no está configurada.");
// }

// const client = new MongoClient(URI);

// try {
//   await client.connect();
//   await client.db("admin").command({ ping: 1 });
//   console.log("Conexión exitosa a MongoDB");
// } catch (err) {
//   console.error("Error conectando a MongoDB:", err);
//   process.exit(1);
// }

// const db = client.db("peer2pong"); // Cambia el nombre de la base si es necesario
// export default db;

import { MongoClient } from "mongodb";

const URI = process.env.DB_URI;
if (!URI) {
  throw new Error("La variable de entorno DB_URI no está configurada.");
}

const client = new MongoClient(URI);

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Conexión exitosa a MongoDB");
} catch (err) {
  console.error("Error conectando a MongoDB:", err);
  process.exit(1);
}

const db = client.db("peer2pong");
export default db;
