import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Ruta para crear un nuevo partido
router.post("/", async (req, res) => {
    try {
        const { date, teams, scores, status, tournament, usuario1, usuario2 } = req.body;

        // Creamos un nuevo objeto de partido con los datos recibidos
        const newMatch = {
            date: new Date(date), // Convertimos la fecha a un objeto Date
            teams: teams.map(id => {
                // Convertimos los IDs de los equipos a ObjectId
                if (!isNaN(id)) {
                    return ObjectId.createFromTime(Number(id)); // Si el ID es un número, usamos createFromTime
                } else {
                    return ObjectId(id.toString()); // Si no es un número, lo convertimos a cadena y luego a ObjectId
                }
            }),
            scores: scores, // Puntuaciones del partido
            status: status, // Estado del partido
            tournament: (function() {
                // Convertimos el ID del torneo a ObjectId
                if (!isNaN(tournament)) {
                    return ObjectId.createFromTime(Number(tournament)); // Si el ID es un número, usamos createFromTime
                } else {
                    return ObjectId(tournament.toString()); // Si no es un número, lo convertimos a cadena y luego a ObjectId
                }
            })(),
            usuario1: ObjectId(usuario1), // Usuario 1
            usuario2: ObjectId(usuario2)  // Usuario 2
        };

        // Insertamos el nuevo partido en la colección "matches"
        const result = await db.collection("matches").insertOne(newMatch);
        res.status(201).json(result); // Devolvemos una respuesta con el resultado de la inserción
    } catch (error) {
        console.error("Error creando partido:", error);
        res.status(500).json({ error: "No se pudo crear el partido" }); // Devolvemos un error en caso de fallo
    }
});

// Ruta para obtener todos los partidos
router.get("/", async (req, res) => {
    try {
        // Obtenemos todos los partidos de la colección "matches"
        const matches = await db.collection("matches").find({}).toArray();
        res.status(200).json(matches); // Devolvemos los partidos en la respuesta
    } catch (error) {
        console.error("Error obteniendo partidos:", error);
        res.status(500).json({ error: "No se pudo obtener los partidos" }); // Devolvemos un error en caso de fallo
    }
});

// Ruta para obtener un partido por ID
router.get("/:id", async (req, res) => {
    try {
        const matchId = req.params.id; // Obtenemos el ID del partido de los parámetros de la URL
        let objectId;
        if (!isNaN(matchId)) {
            objectId = ObjectId.createFromTime(Number(matchId)); // Si el ID es un número, usamos createFromTime
        } else {
            objectId = ObjectId(matchId.toString()); // Si no es un número, lo convertimos a cadena y luego a ObjectId
        }
        // Buscamos el partido en la colección "matches" por su ObjectId
        const match = await db.collection("matches").findOne({ _id: objectId });
        if (!match) {
            res.status(404).json({ error: "Partido no encontrado" }); // Devolvemos un error si no se encuentra el partido
        } else {
            res.status(200).json(match); // Devolvemos el partido encontrado
        }
    } catch (error) {
        console.error("Error obteniendo partido:", error);
        res.status(500).json({ error: "No se pudo obtener el partido" }); // Devolvemos un error en caso de fallo
    }
});

// Ruta para actualizar un partido
router.put("/:id", async (req, res) => {
    try {
        const updates = req.body; // Obtenemos los datos a actualizar del cuerpo de la solicitud
        const matchId = req.params.id; // Obtenemos el ID del partido de los parámetros de la URL
        let objectId;
        if (!isNaN(matchId)) {
            objectId = ObjectId.createFromTime(Number(matchId)); // Si el ID es un número, usamos createFromTime
        } else {
            objectId = ObjectId(matchId.toString()); // Si no es un número, lo convertimos a cadena y luego a ObjectId
        }

        // Obtenemos el partido actual antes de la actualización
        const match = await db.collection("matches").findOne({ _id: objectId });
        if (!match) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }

        // Validamos el estado del partido
        if (match.status === "finalizado" || match.status === "cancelado") {
            return res.status(400).json({
                error: `No se puede actualizar un partido ${match.status}`
            });
        }

        // Si no está finalizado o cancelado, se actualizan los campos permitidos
        const result = await db.collection("matches").updateOne({ _id: objectId }, { $set: updates });
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Partido no encontrado" }); // Devolvemos un error si no se encuentra el partido
        } else {
            res.status(200).json({ message: "Partido actualizado" }); // Devolvemos un mensaje de éxito
        }
    } catch (error) {
        console.error("Error actualizando partido:", error);
        res.status(500).json({ error: "No se pudo actualizar el partido" }); // Devolvemos un error en caso de fallo
    }
});

// Ruta para eliminar un partido
router.delete("/:id", async (req, res) => {
    try {
        const matchId = req.params.id; // Obtenemos el ID del partido de los parámetros de la URL
        let objectId;
        if (!isNaN(matchId)) {
            objectId = ObjectId.createFromTime(Number(matchId)); // Si el ID es un número, usamos createFromTime
        } else {
            objectId = ObjectId(matchId.toString()); // Si no es un número, lo convertimos a cadena y luego a ObjectId
        }

        // Eliminamos el partido de la colección "matches" por su ObjectId
        const result = await db.collection("matches").deleteOne({ _id: objectId });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Partido no encontrado" }); // Devolvemos un error si no se encuentra el partido
        } else {
            res.status(200).json({ message: "Partido eliminado" }); // Devolvemos un mensaje de éxito
        }
    } catch (error) {
        console.error("Error eliminando partido:", error);
        res.status(500).json({ error: "No se pudo eliminar el partido" }); // Devolvemos un error en caso de fallo
    }
});

export default router;
