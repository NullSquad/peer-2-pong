import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Crear un nuevo partido
router.post("/", async (req, res) => {
    try {
        const newMatch = {
            date: new Date(req.body.date),
            teams: req.body.teams.map(id => new ObjectId(id)),
            scores: req.body.scores,
            status: req.body.status,
            tournament: new ObjectId(req.body.tournament)
        };
        const result = await db.collection("matches").insertOne(newMatch);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creando partido:", error);
        res.status(500).json({ error: "No se pudo crear el partido" });
    }
});

// Obtener todos los partidos
router.get("/", async (req, res) => {
    try {
        const matches = await db.collection("matches").find({}).toArray();
        res.status(200).json(matches);
    } catch (error) {
        console.error("Error obteniendo partidos:", error);
        res.status(500).json({ error: "No se pudo obtener los partidos" });
    }
});

// Obtener un partido por ID
router.get("/:id", async (req, res) => {
    try {
        const match = await db.collection("matches").findOne({ _id: new ObjectId(req.params.id) });
        if (!match) {
            res.status(404).json({ error: "Partido no encontrado" });
        } else {
            res.status(200).json(match);
        }
    } catch (error) {
        console.error("Error obteniendo partido:", error);
        res.status(500).json({ error: "No se pudo obtener el partido" });
    }
});

// Actualizar un partido
router.put("/:id", async (req, res) => {
    try {
        const updates = req.body;
        const result = await db.collection("matches").updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Partido no encontrado" });
        } else {
            res.status(200).json({ message: "Partido actualizado" });
        }
    } catch (error) {
        console.error("Error actualizando partido:", error);
        res.status(500).json({ error: "No se pudo actualizar el partido" });
    }
});

// Eliminar un partido
router.delete("/:id", async (req, res) => {
    try {
        const result = await db.collection("matches").deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Partido no encontrado" });
        } else {
            res.status(200).json({ message: "Partido eliminado" });
        }
    } catch (error) {
        console.error("Error eliminando partido:", error);
        res.status(500).json({ error: "No se pudo eliminar el partido" });
    }
});

export default router;
