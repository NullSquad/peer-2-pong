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
 * Validar la configuración de una competición
 * @param {Object} settings - Configuración de la competición
 * @returns {boolean} - True si la configuración es válida
 */
function validateCompetitionSettings(settings) {
    return (
        settings &&
        typeof settings.maxParticipants === 'number' &&
        settings.maxParticipants > 0 &&
        ['weekly', 'biweekly', 'monthly'].includes(settings.frequency) &&
        typeof settings.quantity === 'number' &&
        settings.quantity > 0
    );
}

/**
 * Ruta para crear una nueva competición.
 * @route POST /competitions
 * @body { 
 *   name: string, 
 *   type: string, 
 *   startDate: date, 
 *   endDate: date, 
 *   settings: object 
 * }
 * @returns {Object} - Resultado de la creación de la competición.
 */
router.post("/", async (req, res) => {
    try {
        const { 
            name,
            type,
            startDate,
            endDate,
            settings
        } = req.body;

        // Validación de los datos
        if (!name || !type || !startDate || !endDate || !settings) {
            return res.status(400).json({ error: "Faltan datos para crear la competición" });
        }

        // Validar fechas
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
            return res.status(400).json({ error: "Fechas de competición inválidas" });
        }

        // Validar configuración
        if (!validateCompetitionSettings(settings)) {
            return res.status(400).json({ error: "Configuración de competición inválida" });
        }

        // Crear un nuevo objeto de competición
        const newCompetition = {
            name,
            type,
            startDate: start,
            endDate: end,
            participants: [], // Lista vacía al iniciar
            matches: [], // Lista vacía para los partidos
            settings: {
                maxParticipants: settings.maxParticipants,
                frequency: settings.frequency,
                quantity: settings.quantity
            },
            status: 'pending' // Estado inicial de la competición
        };

        // Insertar la competición en la base de datos
        const result = await db.collection("competitions").insertOne(newCompetition);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creando competición:", error);
        res.status(500).json({ error: "No se pudo crear la competición" });
    }
});

// Resto de las rutas permanecen igual (sin cambios)
router.get("/", async (req, res) => {
    try {
        const competitions = await db.collection("competitions").find({}).toArray();
        res.status(200).json(competitions);
    } catch (error) {
        console.error("Error obteniendo competiciones:", error);
        res.status(500).json({ error: "No se pudieron obtener las competiciones" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de competición inválido" });
        }

        const competitionId = new ObjectId(id);
        const competition = await db.collection("competitions").findOne({ _id: competitionId });

        if (!competition) {
            return res.status(404).json({ error: "Competición no encontrada" });
        }
        res.status(200).json(competition);
    } catch (error) {
        console.error("Error obteniendo competición:", error);
        res.status(500).json({ error: "No se pudo obtener la competición" });
    }
});

router.post("/:id/participants", async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id; // Obtener el ID del usuario autenticado

        // Validación de los IDs
        if (!ObjectId.isValid(id) || !ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: "ID de competición o usuario inválido" });
        }

        const competitionId = new ObjectId(id);
        const userId = new ObjectId(user_id);

        // Verificar si la competición existe
        const competition = await db.collection("competitions").findOne({ _id: competitionId });
        if (!competition) {
            return res.status(404).json({ error: "Competición no encontrada" });
        }

        // Verificar si el usuario ya está en la competición
        const alreadyParticipant = competition.participants.some(
            (participant) => participant.user_id.equals(userId)
        );
        if (alreadyParticipant) {
            return res.status(400).json({ error: "El usuario ya está en la competición" });
        }

        // Agregar el participante con ELO inicial de 0
        const newParticipant = {
            user_id: userId,
            elo: 0
        };

        const updateResult = await db.collection("competitions").updateOne(
            { _id: competitionId },
            { $push: { participants: newParticipant } }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(500).json({ error: "No se pudo agregar el participante" });
        }

        res.status(200).json({ message: "Participante agregado a la competición" });
    } catch (error) {
        console.error("Error agregando participante:", error);
        res.status(500).json({ error: "No se pudo agregar el participante" });
    }
});

export default router;
