import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Función para verificar existencia
const checkExistence = async (collection, query) => {
  try {
    const result = await collection.findOne(query);
    return result;
  } catch (err) {
    console.error("Error verificando existencia:", err);
    throw new Error("Error checking existence");
  }
};

// Obtener todas las ligas
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("leagues");
    const leagues = await collection.find({}).toArray();
    res.status(200).json(leagues);
  } catch (err) {
    console.error("Error obteniendo ligas:", err);
    res.status(500).json({ error: "No se pudo obtener las ligas" });
  }
});

// Obtener una liga por ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("leagues");
    const league = await checkExistence(collection, { _id: new ObjectId(req.params.id) });

    if (!league) return res.status(404).json({ message: "Liga no encontrada" });
    res.status(200).json(league);
  } catch (err) {
    console.error("Error obteniendo liga:", err);
    res.status(500).json({ error: "No se pudo obtener la liga" });
  }
});

// Crear una nueva liga
router.post("/", async (req, res) => {
  try {
    const { name, description, numberOfParticipants, minPlayers, startDate, endDate, rewards, leaderboard = [], matches = [] } = req.body;

    if (!name || !description || !numberOfParticipants || !minPlayers || !startDate || !endDate || !rewards) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const league = {
      name,
      description,
      numberOfParticipants,
      minPlayers,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      rewards,
      leaderboard,
      matches: matches.map((match) => new ObjectId(match)),
      createdAt: new Date(),
    };

    const collection = await db.collection("leagues");
    const result = await collection.insertOne(league);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creando liga:", err);
    res.status(500).json({ error: "No se pudo crear la liga" });
  }
});

// Eliminar una liga por ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("leagues");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Liga no encontrada" });
    }
    res.status(200).json({ message: "Liga eliminada" });
  } catch (err) {
    console.error("Error eliminando liga:", err);
    res.status(500).json({ error: "No se pudo eliminar la liga" });
  }
});

// Actualizar una liga por ID
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updateData = req.body;

    // Validar que no se intente modificar `_id`
    if (updateData._id) {
      return res.status(400).json({ error: "No se puede modificar el _id" });
    }

    // Convertir referencias a ObjectId
    if (updateData.matches) {
      updateData.matches = updateData.matches.map((match) => new ObjectId(match));
    }
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const collection = await db.collection("leagues");
    const result = await collection.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Liga no encontrada" });
    }
    res.status(200).json({ message: "Liga actualizada" });
  } catch (err) {
    console.error("Error actualizando liga:", err);
    res.status(500).json({ error: "No se pudo actualizar la liga" });
  }
});

export default router;
