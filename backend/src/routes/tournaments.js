import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Crear un nuevo torneo
router.post("/", async (req, res) => {
    try {
        const newTournament = {
            name: req.body.name,
            createdBy: new ObjectId(req.body.createdBy),
            participants: [],
            matches: []
        };
        const result = await db.collection("tournaments").insertOne(newTournament);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creando torneo:", error);
        res.status(500).json({ error: "No se pudo crear el torneo" });
    }
});

// Obtener todos los torneos
router.get("/", async (req, res) => {
    try {
        const tournaments = await db.collection("tournaments").find({}).toArray();
        res.status(200).json(tournaments);
    } catch (error) {
        console.error("Error obteniendo torneos:", error);
        res.status(500).json({ error: "No se pudo obtener los torneos" });
    }
});

// Obtener un torneo por ID
router.get("/:id", async (req, res) => {
    try {
        const tournament = await db.collection("tournaments").findOne({ _id: new ObjectId(req.params.id) });
        if (!tournament) {
            res.status(404).json({ error: "Torneo no encontrado" });
        } else {
            res.status(200).json(tournament);
        }
    } catch (error) {
        console.error("Error obteniendo torneo:", error);
        res.status(500).json({ error: "No se pudo obtener el torneo" });
    }
});

// Actualizar un torneo
router.put("/:id", async (req, res) => {
    try {
        const updates = req.body;
        const result = await db.collection("tournaments").updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Torneo no encontrado" });
        } else {
            res.status(200).json({ message: "Torneo actualizado" });
        }
    } catch (error) {
        console.error("Error actualizando torneo:", error);
        res.status(500).json({ error: "No se pudo actualizar el torneo" });
    }
});

// Eliminar un torneo
router.delete("/:id", async (req, res) => {
    try {
        const result = await db.collection("tournaments").deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Torneo no encontrado" });
        } else {
            res.status(200).json({ message: "Torneo eliminado" });
        }
    } catch (error) {
        console.error("Error eliminando torneo:", error);
        res.status(500).json({ error: "No se pudo eliminar el torneo" });
    }
});

export default router;
