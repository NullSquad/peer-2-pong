import express from "express";
import indexRoutes from "./routes/index.js";
import mongoose from "mongoose";

const app = express();  // Inicializa una instancia de Express
const PORT = 3001;  // Puerto desde las variables de entorno (si es necesario)

// Middleware para analizar JSONs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexión a la base de datos MongoDB usando Mongoose
mongoose.connect('mongodb://localhost:3001/yourDatabase')  // Eliminamos las opciones en desuso
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Rutas base definidas en 'indexRoutes'
app.use("/", indexRoutes);

/**
 * Endpoint adicional para verificar que el servidor está funcionando correctamente.
 * Endpoint: GET /ping
 * Respuesta: "Pong"
 */
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send("Uh oh! An unexpected error occurred.");
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
