import express from "express";
import controller from "../controllers/users.js";

const router = express.Router();

/* 
  The users collection will have the following fields:
  - email: String
  - login: String
  - image: String
  - campus: String
*/

router.get("/", async (req, res) => {
  try {
    let results = controller.getAll();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading users");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let result = controller.getById(req.params.id);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading user");
  }
});

router.post("/", async (req, res) => {
  try {
    let result = controller.add(req.body);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updates = {
        email: req.body.email,
        login: req.body.login,
        image: req.body.image,
    };

    let result = controller.update(req.params.id, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let result = await collection.deleteOne(req.params.id);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
