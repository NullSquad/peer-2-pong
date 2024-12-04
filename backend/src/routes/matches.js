import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Función auxiliar para verificar la existencia de un documento por ID
async function checkExistence(collection, id) {
    const document = await db.collection(collection).findOne({ _id: id });
    return !!document;
}

// Ruta para crear un nuevo partido
router.post("/", async (req, res) => {
    try {
        const { date, scores, status, tournament, usuario1, usuario2, league } = req.body;

        // Validación de campos obligatorios
        if (!date || !status || !usuario1 || !usuario2) {
            return res.status(400).json({ error: "Faltan datos necesarios" });
        }

        // Conversión de IDs de torneo y liga si existen
        const tournamentId = tournament ? new ObjectId(tournament) : null;
        const leagueId = league ? new ObjectId(league) : null;
        const user1Id = new ObjectId(usuario1);
        const user2Id = new ObjectId(usuario2);

        // Verificar existencia de torneo, si se proporciona
        if (tournamentId) {
            const tournamentExists = await checkExistence("tournaments", tournamentId);
            if (!tournamentExists) return res.status(404).json({ error: "Torneo no encontrado" });
        }

        // Verificar existencia de ambos usuarios
        const user1Exists = await checkExistence("users", user1Id);
        const user2Exists = await checkExistence("users", user2Id);
        if (!user1Exists) return res.status(404).json({ error: "Usuario 1 no encontrado" });
        if (!user2Exists) return res.status(404).json({ error: "Usuario 2 no encontrado" });

        // Crear el objeto para el nuevo partido
        const newMatch = {
            date: new Date(date),
            scores,
            scoreConfirmed: { usuario1: false, usuario2: false },
            status,
            tournament: tournamentId,
            usuario1: user1Id,
            usuario2: user2Id,
            league: leagueId,
        };

        // Insertar el nuevo partido en la base de datos
        const result = await db.collection("matches").insertOne(newMatch);
        res.status(201).json(result);  // Devolver el resultado de la creación
    } catch (error) {
        console.error("Error creando partido:", error);
        res.status(500).json({ error: "No se pudo crear el partido" });
    }
});

// Ruta para obtener todos los partidos
router.get("/", async (req, res) => {
    try {
        const matches = await db.collection("matches").find({}).toArray();
        res.status(200).json(matches);  // Devolver todos los partidos
    } catch (error) {
        console.error("Error obteniendo partidos:", error);
        res.status(500).json({ error: "No se pudieron obtener los partidos" });
    }
});

// Ruta para obtener un partido por ID
router.get("/:id", async (req, res) => {
    try {
        const matchId = req.params.id;
        const objectId = new ObjectId(matchId);  // Convertir el ID a ObjectId

        const match = await db.collection("matches").findOne({ _id: objectId });
        if (!match) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        res.status(200).json(match);  // Devolver el partido encontrado
    } catch (error) {
        console.error("Error obteniendo partido:", error);
        res.status(500).json({ error: "No se pudo obtener el partido" });
    }
});

// Ruta para actualizar un partido
router.put("/:id", async (req, res) => {
    try {
        const { scores, status, tournament } = req.body;  // Incluir torneo en la actualización
        const matchId = req.params.id;
        const objectId = new ObjectId(matchId);  // Convertir el ID a ObjectId

        const match = await db.collection("matches").findOne({ _id: objectId });
        if (!match) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }

        // Verificar si el partido ya está finalizado o cancelado
        if (match.status === "finalizado" || match.status === "cancelado") {
            return res.status(400).json({ error: "No se puede actualizar un partido finalizado o cancelado" });
        }

        // Preparar los campos a actualizar
        const updateFields = {};
        if (scores) {
            if (!scores.usuario1 || !scores.usuario2) {
                return res.status(400).json({ error: "Se requiere la puntuación de ambos usuarios" });
            }
            updateFields.scores = scores;
        }
        if (status) updateFields.status = status;

        // Manejar el torneo en caso de ser actualizado
        if (tournament) {
            const tournamentId = new ObjectId(tournament);
            const tournamentExists = await checkExistence("tournaments", tournamentId);
            if (!tournamentExists) {
                return res.status(404).json({ error: "Torneo no encontrado" });
            }
            updateFields.tournament = tournamentId;
        }

        // Confirmar puntuación antes de marcar como "finalizado"
        if (match.scoreConfirmed.usuario1 && match.scoreConfirmed.usuario2 && status === "finalizado") {
            updateFields.status = "finalizado";
        }

        // Actualizar el partido en la base de datos
        const result = await db.collection("matches").updateOne(
            { _id: objectId },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Partido no encontrado para actualizar" });
        }

        res.status(200).json({ message: "Partido actualizado" });
    } catch (error) {
        console.error("Error actualizando partido:", error);
        res.status(500).json({ error: "No se pudo actualizar el partido" });
    }
});

// Ruta para eliminar un partido
router.delete("/:id", async (req, res) => {
    try {
        const matchId = req.params.id;
        const objectId = new ObjectId(matchId);  // Convertir el ID a ObjectId

        // Eliminar el partido de la base de datos
        const result = await db.collection("matches").deleteOne({ _id: objectId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        res.status(200).json({ message: "Partido eliminado" });
    } catch (error) {
        console.error("Error eliminando partido:", error);
        res.status(500).json({ error: "No se pudo eliminar el partido" });
    }
});

// Exportar el router para que sea accesible en otras partes de la aplicación
export default router;
