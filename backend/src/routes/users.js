import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// ========================
// Validación de ID de MongoDB
// ========================
const validateObjectId = (id) => {
    try {
        return ObjectId.isValid(id) ? new ObjectId(id) : null;
    } catch {
        return null;
    }
};

// ==============================
// Rutas para gestionar usuarios
// ==============================

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const { login, photo, coalition, campus } = req.body;

        // Validación de campos obligatorios
        if (!login || !photo || !coalition || !campus) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Comprobar si el login ya existe
        const existingUser = await db.collection("users").findOne({ login: new RegExp(`^${login}$`, "i") });
        if (existingUser) {
            return res.status(400).json({ error: "El login ya existe" });
        }

        // Crear un nuevo usuario
        const newUser = { login, photo, coalition, campus };
        const result = await db.collection("users").insertOne(newUser);

        res.status(201).json({ message: "Usuario creado", userId: result.insertedId });
    } catch (error) {
        console.error("Error creando usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const objectId = validateObjectId(req.params.id);
        if (!objectId) {
            return res.status(400).json({ error: "ID de usuario inválido" });
        }
        const user = await db.collection("users").findOne({ _id: objectId });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener los partidos de un usuario por ID
router.get("/:id/matches", async (req, res) => {
  try {
      const objectId = validateObjectId(req.params.id);
      if (!objectId) {
          return res.status(400).json({ error: "ID de usuario inválido" });
      }

      // Obtener los partidos en los que el usuario ha participado
      const matches = await db.collection("matches").find({
          "players.userId": objectId
      }).toArray();

      if (!matches.length) {
          return res.status(404).json({ error: "No se encontraron partidos para este usuario" });
      }

      res.status(200).json(matches);
  } catch (error) {
      console.error("Error obteniendo partidos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
