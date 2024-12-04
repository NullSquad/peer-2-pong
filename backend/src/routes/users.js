import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// ========================
// Validación de ID de MongoDB
// ========================

/**
 * Función para validar si el ID es un ObjectId válido.
 * @param {string} id - ID a validar.
 * @returns {ObjectId|null} Retorna un ObjectId si es válido, o null si no lo es.
 */
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
/**
 * Ruta GET para obtener todos los usuarios.
 * @route GET /users
 * @returns {Array} Lista de usuarios.
 */
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
/**
 * Ruta POST para crear un nuevo usuario.
 * @route POST /users
 * @param {string} name - Nombre del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Object} Mensaje de éxito con el ID del usuario creado.
 */
router.post("/", async (req, res) => {
    try {
        const { name, email, token } = req.body;

        // Validación de campos obligatorios
        if (!name || !email || !token) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Comprobar si el nombre o correo ya existen
        const existingUser = await db.collection("users").findOne({
            $or: [{ name: new RegExp(`^${name}$`, "i") }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({ error: "El nombre o correo ya existen" });
        }

        // Crear un nuevo usuario
        const newUser = {
            name,
            email,
            token,
            rank: "Rookie",
            matches: 0,
            wins: 0,
            losses: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            currentSeason: "Season 1",
            tournaments: [],
            matchHistory: []
        };

        const result = await db.collection("users").insertOne(newUser);
        res.status(201).json({ message: "Usuario creado", userId: result.insertedId });
    } catch (error) {
        console.error("Error creando usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener un usuario por ID
/**
 * Ruta GET para obtener un usuario por su ID.
 * @route GET /users/:id
 * @param {string} id - ID del usuario.
 * @returns {Object} Información del usuario.
 */
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

// Obtener los matches de un usuario por ID
/**
 * Ruta GET para obtener los partidos de un usuario por su ID.
 * @route GET /users/:id/matches
 * @param {string} id - ID del usuario.
 * @returns {Array} Lista de partidos asociados al usuario.
 */
router.get("/:id/matches", async (req, res) => {
    try {
        const objectId = validateObjectId(req.params.id);
        if (!objectId) {
            return res.status(400).json({ error: "ID de usuario inválido" });
        }

        const user = await db.collection("users").findOne({ _id: objectId });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Obtener los partidos en los que el usuario ha participado (como usuario1 o usuario2)
        const matches = await db.collection("matches").find({
            $or: [{ usuario1: objectId }, { usuario2: objectId }]
        }).toArray();

        res.status(200).json(matches);
    } catch (error) {
        console.error("Error obteniendo partidos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Exportar el router para ser usado en otros archivos
export default router;
