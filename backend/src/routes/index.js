import { Router } from "express";
import usersRoutes from "./users.js";
import matchRoutes from "./matches.js";
import tournamentRoutes from "./tournaments.js";

const router = Router();

// Rutas de toda la aplicación
router.use("/users", usersRoutes); // Asocia todas las rutas de "users.js" al prefijo "/users"
router.use("/matches", matchRoutes); // Asocia todas las rutas de "matches.js" al prefijo "/matches"
router.use("/tournaments", tournamentRoutes); // Asocia todas las rutas de "tournaments.js" al prefijo "/tournaments"

/**
 * Ruta base para verificar el estado del servidor.
 * Endpoint: GET /
 * Respuesta: "Hello from Express!"
 */
router.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Exportar el enrutador para usarlo en la aplicación principal
export default router;
