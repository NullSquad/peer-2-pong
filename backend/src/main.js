import express from "express";
import indexRoutes from "./routes/index.js";

const app = express(); // Inicializa una instancia de Express
const PORT = 3000 // process.env.BACKEND_PORT; Puerto desde las variables de entorno

// Middleware para analizar JSONs
app.use(express.json());

// "/": Todas las rutas base están definidas en `indexRoutes`.
app.use("/", indexRoutes); 

/**
 * Endpoint adicional para verificar que el servidor está funcionando correctamente.
 * Endpoint: GET /ping
 * Respuesta: "Pong"
 */
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});