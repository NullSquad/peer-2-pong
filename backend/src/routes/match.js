import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * Verifica la existencia de un documento en una colección por su ID.
 * @param {string} collection - Nombre de la colección.
 * @param {string} id - ID del documento.
 * @returns {Promise<boolean>} - Retorna true si el documento existe, de lo contrario false.
 */
async function checkExistence(collection, id) {
    const document = await db.collection(collection).findOne({ _id: ObjectId.createFromHexString(id) });
    return !!document;
}

/**
 * Crea un nuevo partido.
 * @route POST /matches
 * @param {string} competition - ID de la competición.
 * @param {string} status - Estado del partido.
 * @param {string} date - Fecha del partido.
 * @param {Array} players - Lista de jugadores.
 * @param {string} reporter - ID del reportero.
 * @returns {Object} - Mensaje de éxito y ID del partido creado.
 */
router.post("/", async (req, res) => {
    try {
        const { competition, status, date, players, reporter } = req.body;

        // Validación de campos obligatorios
        if (!competition || !status || !date || !players || !reporter) {
            return res.status(400).json({ error: "Faltan datos necesarios" });
        }

        // Validar que players sea un array
        if (!Array.isArray(players)) {
            return res.status(400).json({ error: "El campo 'players' debe ser un array" });
        }

        // Validar existencia de la competición
        const competitionExists = await checkExistence("competitions", competition);
        if (!competitionExists) return res.status(404).json({ error: "Competición no encontrada" });

        // Validar existencia del reportero
        const reporterExists = await checkExistence("users", reporter);
        if (!reporterExists) return res.status(404).json({ error: "Reportero no encontrado" });

        // Validar que los jugadores existan y que el reportero sea uno de ellos
        let reporterIsPlayer = false;
        for (const player of players) {
            const playerExists = await checkExistence("users", player.userId);
            if (!playerExists) {
                return res.status(404).json({ error: `Jugador con ID ${player.userId} no encontrado` });
            }
            if (player.userId === reporter) {
                reporterIsPlayer = true;
            }
        }

        if (!reporterIsPlayer) {
            return res.status(400).json({ error: "El reportero debe ser uno de los jugadores" });
        }

        // Crear el objeto del partido
        const newMatch = {
            competition: ObjectId.createFromHexString(competition),
            status,
            date: new Date(date),
            players: players.map(player => ({
                userId: ObjectId.createFromHexString(player.userId),
                score: player.score
            })),
            reporter: ObjectId.createFromHexString(reporter)
        };

        // Insertar el partido en la base de datos
        const result = await db.collection("matches").insertOne(newMatch);
        res.status(201).json({ message: "Partido creado con éxito", id: result.insertedId });
    } catch (error) {
        console.error("Error creando partido:", error);
        res.status(500).json({ error: "No se pudo crear el partido" });
    }
});

/**
 * Obtiene todos los partidos.
 * @route GET /matches
 * @returns {Array} - Lista de partidos.
 */
router.get("/", async (req, res) => {
    try {
        const matches = await db.collection("matches").find({}).toArray();
        res.status(200).json(matches);
    } catch (error) {
        console.error("Error obteniendo partidos:", error);
        res.status(500).json({ error: "No se pudieron obtener los partidos" });
    }
});

/**
 * Obtiene un partido por su ID.
 * @route GET /matches/:id
 * @param {string} id - ID del partido.
 * @returns {Object} - Datos del partido.
 */
router.get("/:id", async (req, res) => {
    try {
        const matchId = req.params.id;
        const match = await db.collection("matches").findOne({ _id: ObjectId.createFromHexString(matchId) });
        if (!match) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        res.status(200).json(match);
    } catch (error) {
        console.error("Error obteniendo partido:", error);
        res.status(500).json({ error: "No se pudo obtener el partido" });
    }
});

/**
 * Actualiza un partido por su ID.
 * @route PUT /matches/:id
 * @param {string} id - ID del partido.
 * @param {string} [competition] - ID de la competición.
 * @param {string} [status] - Estado del partido.
 * @param {string} [date] - Fecha del partido.
 * @param {Array} [players] - Lista de jugadores.
 * @param {string} [reporter] - ID del reportero.
 * @returns {Object} - Mensaje de éxito.
 */
router.put("/:id", async (req, res) => {
    try {
        const { competition, status, date, players, reporter } = req.body;
        const matchId = req.params.id;

        const matchExists = await db.collection("matches").findOne({ _id: ObjectId.createFromHexString(matchId) });
        if (!matchExists) return res.status(404).json({ error: "Partido no encontrado" });

        const updatedMatch = {};

        if (competition) updatedMatch.competition = ObjectId.createFromHexString(competition);
        if (status) updatedMatch.status = status;
        if (date) updatedMatch.date = new Date(date);
        if (players) {
            if (!Array.isArray(players)) {
                return res.status(400).json({ error: "El campo 'players' debe ser un array" });
            }
            updatedMatch.players = players.map(player => ({
                userId: ObjectId.createFromHexString(player.userId),
                score: player.score
            }));
        }

        // Validar existencia del reportero
        if (reporter) {
            const reporterExists = await checkExistence("users", reporter);
            if (!reporterExists) return res.status(404).json({ error: "Reportero no encontrado" });

            // Validar que el reportero sea uno de los jugadores
            let reporterIsPlayer = false;
            if (players) {
                for (const player of players) {
                    if (player.userId === reporter) {
                        reporterIsPlayer = true;
                        break;
                    }
                }
            } else {
                // Si no se proporciona 'players', obtener los jugadores del partido existente
                const existingMatch = await db.collection("matches").findOne({ _id: ObjectId.createFromHexString(matchId) });
                for (const player of existingMatch.players) {
                    if (player.userId.toString() === reporter) {
                        reporterIsPlayer = true;
                        break;
                    }
                }
            }

            if (!reporterIsPlayer) {
                return res.status(400).json({ error: "El reportero debe ser uno de los jugadores" });
            }

            updatedMatch.reporter = ObjectId.createFromHexString(reporter);
        }

        const result = await db.collection("matches").updateOne(
            { _id: ObjectId.createFromHexString(matchId) },
            { $set: updatedMatch }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "No se encontró el partido para actualizar" });
        }
        res.status(200).json({ message: "Partido actualizado con éxito" });
    } catch (error) {
        console.error("Error actualizando partido:", error);
        res.status(500).json({ error: "No se pudo actualizar el partido" });
    }
});

/**
 * Elimina un partido por su ID.
 * @route DELETE /matches/:id
 * @param {string} id - ID del partido.
 * @returns {Object} - Mensaje de éxito.
 */
router.delete("/:id", async (req, res) => {
    try {
        const matchId = req.params.id;
        const result = await db.collection("matches").deleteOne({ _id: ObjectId.createFromHexString(matchId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        res.status(200).json({ message: "Partido eliminado con éxito" });
    } catch (error) {
        console.error("Error eliminando partido:", error);
        res.status(500).json({ error: "No se pudo eliminar el partido" });
    }
});

export default router;
