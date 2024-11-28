import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        res.status(500).json({ error: "No se pudo obtener los usuarios" });
    }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const { name, email, token } = req.body;

        // Validar que el nombre y el email no existan ya (insensible a mayúsculas)
        const existingUser = await db.collection("users").findOne({
            $or: [{ name: new RegExp(`^${name}$`, 'i') }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({ error: "El nombre o correo ya existen" });
        }

        const newUser = {
            name,
            email,
            token,
            rank: "Rookie", // Rango por defecto
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
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creando usuario:", error);
        res.status(500).json({ error: "No se pudo crear el usuario" });
    }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Verificar si el userId es un número (timestamp) o una cadena hexadecimal
        let objectId;
        if (!isNaN(userId)) {
            // Si es un número, usamos createFromTime para crear el ObjectId
            objectId = ObjectId.createFromTime(Number(userId));
        } else {
            // Si no es un número, lo tratamos como un ObjectId estándar
            objectId = new ObjectId(userId);
        }

        const user = await db.collection("users").findOne({ _id: objectId });
        
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        res.status(500).json({ error: "No se pudo obtener el usuario" });
    }
});

// Actualizar un usuario
router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, ...updates } = req.body;

        // Verificar si el userId es un número (timestamp) o una cadena hexadecimal
        let objectId;
        if (!isNaN(userId)) {
            objectId = ObjectId.createFromTime(Number(userId));
        } else {
            objectId = new ObjectId(userId);
        }

        // Validar que el nombre y el email no sean duplicados (insensible a mayúsculas)
        if (name || email) {
            const existingUser = await db.collection("users").findOne({
                $or: [{ name: new RegExp(`^${name}$`, 'i') }, { email }],
                _id: { $ne: objectId } // Excluir el usuario actual de la búsqueda
            });
            if (existingUser) {
                return res.status(400).json({ error: "El nombre o correo ya existen" });
            }
        }

        const result = await db.collection("users").updateOne(
            { _id: objectId },
            { $set: { name, email, ...updates } }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            res.status(200).json({ message: "Usuario actualizado" });
        }
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        res.status(500).json({ error: "No se pudo actualizar el usuario" });
    }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Verificar si el userId es un número (timestamp) o una cadena hexadecimal
        let objectId;
        if (!isNaN(userId)) {
            objectId = ObjectId.createFromTime(Number(userId));
        } else {
            objectId = new ObjectId(userId);
        }

        const result = await db.collection("users").deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            res.status(200).json({ message: "Usuario eliminado" });
        }
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        res.status(500).json({ error: "No se pudo eliminar el usuario" });
    }
});

export default router;
