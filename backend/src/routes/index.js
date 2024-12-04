import express from "express";
import authRoutes from "./auth.js";  // Rutas de autenticación
import usersRoutes from "./users.js";  // Rutas de usuarios
import leaguesRoutes from "./leagues.js";  // Rutas de ligas
import tournamentsRoutes from "./tournaments.js";  // Rutas de torneos
import matchesRoutes from "./matches.js";  // Rutas de partidos

const router = express.Router();

// Rutas para los diferentes módulos
router.use("/auth", authRoutes);  // Autenticación
router.use("/users", usersRoutes);  // Usuarios
router.use("/leagues", leaguesRoutes);  // Ligas
router.use("/tournaments", tournamentsRoutes);  // Torneos
router.use("/matches", matchesRoutes);  // Partidos

// Ruta base para verificar que el servidor está funcionando
router.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export default router;
