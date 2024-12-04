import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * Función para verificar la existencia de un documento en una colección por su ID.
 * @param {string} collection - Nombre de la colección en la base de datos.
 * @param {ObjectId} id - ID del documento a verificar.
 * @returns {boolean} - True si el documento existe, de lo contrario false.
 */
async function checkExistence(collection, id) {
    const document = await db.collection(collection).findOne({ _id: id });
    return !!document;
}

/**
 * Ruta para crear un nuevo torneo.
 * @route POST /tournaments
 * @body { name: string, createdBy: string } - Nombre del torneo y ID del creador.
 * @returns {Object} - Resultado de la creación del torneo.
 */
router.post("/", async (req, res) => {
    try {
        const { name, createdBy } = req.body;

        // Validación de los datos
        if (!name || !createdBy) {
            return res.status(400).json({ error: "Faltan datos para crear el torneo" });
        }

        // Crear un nuevo objeto de torneo
        const newTournament = {
            name,
            createdBy: new ObjectId(createdBy),
            participants: [],
            matches: []
        };

        // Insertar el torneo en la base de datos
        const result = await db.collection("tournaments").insertOne(newTournament);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creando torneo:", error);
        res.status(500).json({ error: "No se pudo crear el torneo" });
    }
});

/**
 * Ruta para obtener todos los torneos.
 * @route GET /tournaments
 * @returns {Array} - Lista de torneos.
 */
router.get("/", async (req, res) => {
    try {
        const tournaments = await db.collection("tournaments").find({}).toArray();
        res.status(200).json(tournaments);
    } catch (error) {
        console.error("Error obteniendo torneos:", error);
        res.status(500).json({ error: "No se pudo obtener los torneos" });
    }
});

/**
 * Ruta para agregar un participante a un torneo.
 * @route POST /tournaments/:id/participants
 * @param {string} id - ID del torneo.
 * @body { participantId: string } - ID del participante a agregar.
 * @returns {Object} - Mensaje de éxito o error.
 */
router.post("/:id/participants", async (req, res) => {
    try {
        const { id } = req.params;
        const { participantId } = req.body;

        // Validación de los IDs
        if (!ObjectId.isValid(id) || !ObjectId.isValid(participantId)) {
            return res.status(400).json({ error: "ID de torneo o participante inválido" });
        }

        const tournamentId = new ObjectId(id);
        const participantObjectId = new ObjectId(participantId);

        // Verificar si el torneo existe
        const tournament = await db.collection("tournaments").findOne({ _id: tournamentId });
        if (!tournament) {
            return res.status(404).json({ error: "Torneo no encontrado" });
        }

        // Verificar si el participante existe
        const participantExists = await checkExistence("users", participantObjectId);
        if (!participantExists) {
            return res.status(404).json({ error: "Participante no encontrado" });
        }

        // Verificar si el participante ya está en el torneo
        if (tournament.participants.includes(participantObjectId)) {
            return res.status(400).json({ error: "El participante ya está en el torneo" });
        }

        // Agregar el participante al torneo
        const updateResult = await db.collection("tournaments").updateOne(
            { _id: tournamentId },
            { $push: { participants: participantObjectId } }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(500).json({ error: "No se pudo agregar el participante" });
        }

        res.status(200).json({ message: "Participante agregado al torneo" });
    } catch (error) {
        console.error("Error agregando participante:", error);
        res.status(500).json({ error: "No se pudo agregar el participante" });
    }
});

/**
 * Ruta para actualizar un torneo.
 * @route PUT /tournaments/:id
 * @param {string} id - ID del torneo a actualizar.
 * @body { name: string } - Nuevo nombre del torneo.
 * @returns {Object} - Mensaje de éxito o error.
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Validación de los datos
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de torneo inválido" });
        }

        if (!name) {
            return res.status(400).json({ error: "Falta el nombre del torneo" });
        }

        const tournamentId = new ObjectId(id);

        // Actualizar el nombre del torneo
        const updateResult = await db.collection("tournaments").updateOne(
            { _id: tournamentId },
            { $set: { name } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: "Torneo no encontrado" });
        }

        res.status(200).json({ message: "Torneo actualizado" });
    } catch (error) {
        console.error("Error actualizando torneo:", error);
        res.status(500).json({ error: "No se pudo actualizar el torneo" });
    }
});

/**
 * Ruta para eliminar un participante de un torneo.
 * @route DELETE /tournaments/:id/participants/:participantId
 * @param {string} id - ID del torneo.
 * @param {string} participantId - ID del participante a eliminar.
 * @returns {Object} - Mensaje de éxito o error.
 */
router.delete("/:id/participants/:participantId", async (req, res) => {
    try {
        const { id, participantId } = req.params;

        // Validación de los IDs
        if (!ObjectId.isValid(id) || !ObjectId.isValid(participantId)) {
            return res.status(400).json({ error: "ID de torneo o participante inválido" });
        }

        const tournamentId = new ObjectId(id);
        const participantObjectId = new ObjectId(participantId);

        // Eliminar el participante del torneo
        const updateResult = await db.collection("tournaments").updateOne(
            { _id: tournamentId },
            { $pull: { participants: participantObjectId } }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ error: "Participante o torneo no encontrado" });
        }

        res.status(200).json({ message: "Participante eliminado del torneo" });
    } catch (error) {
        console.error("Error eliminando participante:", error);
        res.status(500).json({ error: "No se pudo eliminar el participante" });
    }
});

/**
 * Ruta para eliminar un torneo.
 * @route DELETE /tournaments/:id
 * @param {string} id - ID del torneo a eliminar.
 * @returns {Object} - Mensaje de éxito o error.
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validación del ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de torneo inválido" });
        }

        const tournamentId = new ObjectId(id);

        // Eliminar el torneo de la base de datos
        const deleteResult = await db.collection("tournaments").deleteOne({ _id: tournamentId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ error: "Torneo no encontrado" });
        }

        res.status(200).json({ message: "Torneo eliminado correctamente" });
    } catch (error) {
        console.error("Error eliminando torneo:", error);
        res.status(500).json({ error: "No se pudo eliminar el torneo" });
    }
});

/**
 * Ruta para obtener un torneo por su ID.
 * @route GET /tournaments/:id
 * @param {string} id - ID del torneo a obtener.
 * @returns {Object} - Información del torneo.
 */
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validación del ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de torneo inválido" });
        }

        const tournamentId = new ObjectId(id);

        // Buscar el torneo por ID
        const tournament = await db.collection("tournaments").findOne({ _id: tournamentId });
        if (!tournament) {
            return res.status(404).json({ error: "Torneo no encontrado" });
        }

        // Responder con el torneo
        res.status(200).json(tournament);
    } catch (error) {
        console.error("Error obteniendo torneo:", error);
        res.status(500).json({ error: "No se pudo obtener el torneo" });
    }
});

export default router;
