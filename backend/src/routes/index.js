// import express from "express";

// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send({message : "Hello from Express!"});
// })

// export default router;




















// import { Router } from "express";
// import usersRoutes from "./users.js";
// import matchRoutes from "./matches.js";
// import tournamentRoutes from "./tournaments.js";


// const router = Router();

// // Agrega rutas específicas
// router.use("/users", usersRoutes);
// router.use("/matches", matchRoutes);
// router.use("/tournaments", tournamentRoutes);


// // Ruta base para verificar que el servidor está en funcionamiento
// router.get("/", (req, res) => {
//     res.send("Hello from Express!");
//   });
  
// export default router;

import { Router } from "express";
import usersRoutes from "./users.js";
import matchRoutes from "./matches.js";
import tournamentRoutes from "./tournaments.js";

const router = Router();

// Agrega rutas específicas
router.use("/users", usersRoutes);
router.use("/matches", matchRoutes);
router.use("/tournaments", tournamentRoutes);

// Ruta base para verificar que el servidor está en funcionamiento
router.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export default router;
