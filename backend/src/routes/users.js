// // import express from "express";

// // import db from "../db/connection.js";

// // import { ObjectId } from "mongodb";

// // const router = express.Router();

// // router.get("/", async (req, res) => {
// //     let collection = await db.collection("users");
// //     let results = await collection.find({}).toArray();
// //     res.send(results).status(200);
// // });

// // router.get("/:id", async (req, res) => {
// //     let collection = await db.collection("users");
// //     let query = { _id: new ObjectId(req.params.id) };
// //     let result = await collection.findOne(query);

// //     if (!result) res.send("Not found").status(404);
// //     else res.send(result).status(200);
// // });

// // router.post("/", async (req, res) => {
// //     try {
// //         let user = {
// //             name: req.body.name,
// //             email: req.body.email,
// //         };
// //         let collection = await db.collection("users");
// //         let result = await collection.insertOne(user);
// //         res.send(result).status(204);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send("Error adding user");
// //     }
// // });

// // router.delete("/:id", async (req, res) => {
// //     try {
// //         const query = { _id: new ObjectId(req.params.id) };

// //         const collection = db.collection("users");
// //         let result = await collection.deleteOne(query);

// //         res.send(result).status(200);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send("Error deleting user");
// //     }
// // });

// // export default router;
// import express from "express";
// import db from "../db/connection.js";
// import { ObjectId } from "mongodb";

// const router = express.Router();

// // Obtener todos los usuarios
// router.get("/", async (req, res) => {
//     try {
//         const collection = db.collection("users");
//         const users = await collection.find({}).toArray();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error("Error obteniendo usuarios:", error);
//         res.status(500).json({ error: "No se pudo obtener los usuarios" });
//     }
// });

// // Obtener un usuario por ID
// router.get("/:id", async (req, res) => {
//     try {
//         const collection = db.collection("users");
//         const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
//         if (!user) {
//             res.status(404).json({ error: "Usuario no encontrado" });
//         } else {
//             res.status(200).json(user);
//         }
//     } catch (error) {
//         console.error("Error obteniendo usuario:", error);
//         res.status(500).json({ error: "No se pudo obtener el usuario" });
//     }
// });

// // Crear un nuevo usuario
// router.post("/", async (req, res) => {
//     try {
//         const newUser = {
//             name: req.body.name,
//             email: req.body.email,
//         };
//         const collection = db.collection("users");
//         const result = await collection.insertOne(newUser);
//         res.status(201).json(result);
//     } catch (error) {
//         console.error("Error creando usuario:", error);
//         res.status(500).json({ error: "No se pudo crear el usuario" });
//     }
// });

// // Eliminar un usuario por ID
// router.delete("/:id", async (req, res) => {
//     try {
//         const collection = db.collection("users");
//         const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
//         if (result.deletedCount === 0) {
//             res.status(404).json({ error: "Usuario no encontrado" });
//         } else {
//             res.status(200).json({ message: "Usuario eliminado" });
//         }
//     } catch (error) {
//         console.error("Error eliminando usuario:", error);
//         res.status(500).json({ error: "No se pudo eliminar el usuario" });
//     }
// });

// export default router;

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
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            token: req.body.token,
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
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creando usuario:", error);
        res.status(500).json({ error: "No se pudo crear el usuario" });
    }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });
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
        const updates = req.body;
        const result = await db.collection("users").updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
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
        const result = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
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

