// import express from "express";
// import { MongoClient } from "mongodb";
// import indexRoutes from "./routes/index.js";
// import usersRoutes from "./routes/users.js";

// // Configuración de las variables de conexión (por ejemplo, valores en un archivo .env)
// const DB_USER = "admin";
// const DB_PASS = "admin123";
// const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@mongo:27017/peer2pong`;
// const BACKEND_PORT = 3000;

// const app = express();

// // Conexión a MongoDB
// const client = new MongoClient(MONGO_URI);

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Conexión exitosa a MongoDB");
//   } catch (error) {
//     console.error("Error conectando a MongoDB:", error);
//   }
// }

// // Middleware
// app.use(express.json());

// // Rutas
// app.use("/", indexRoutes);
// app.use("/users", usersRoutes);

// // Ruta para comprobar si el servidor está funcionando
// app.get("/ping", (req, res) => {
//   res.send("Pong");
// });

// // Iniciar servidor
// app.listen(BACKEND_PORT, () => {
//   console.log(`Server listening on port ${BACKEND_PORT}`);
//   connectToDatabase();
// });

// import express from "express";
// import indexRoutes from "./routes/index.js";

// const DB_USER = "admin";
// const DB_PASS = "admin123";
// const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@mongo:27017/peer2pong`;
// const BACKEND_PORT = 3000;

// const app = express();

// // Middleware
// app.use(express.json());

// // Rutas
// app.use("/", indexRoutes);

// // Ruta para comprobar si el servidor está funcionando
// app.get("/ping", (req, res) => {
//   res.send("Pong");
// });

// // Iniciar servidor
// app.listen(BACKEND_PORT, () => {
//   console.log(`Server listening on port ${BACKEND_PORT}`);
// });



















// import express from "express";
// import indexRoutes from "./routes/index.js";
// import userRoutes from "./routes/users.js";
// import tournamentRoutes from "./routes/tournaments.js";
// import matchRoutes from "./routes/matches.js";

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());

// // Rutas
// app.use("/", indexRoutes);
// app.use("/users", userRoutes);
// app.use("/tournaments", tournamentRoutes);
// app.use("/matches", matchRoutes);

// // Ruta para comprobar si el servidor está funcionando
// app.get("/ping", (req, res) => {
//   res.send("Pong");
// });

// // Iniciar servidor
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

import express from "express";
import indexRoutes from "./routes/index.js";
import userRoutes from "./routes/users.js";
import tournamentRoutes from "./routes/tournaments.js";
import matchRoutes from "./routes/matches.js";

const app = express();
const PORT = 3000; // Asegúrate de que este es el puerto correcto

// Middleware
app.use(express.json());

// Rutas
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/tournaments", tournamentRoutes);
app.use("/matches", matchRoutes);

// Ruta para comprobar si el servidor está funcionando
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
