import express from "express";
import controller from "../controllers/users.js";
import ensureAuthenticated from "../middleware/auth.js";

const router = express.Router();

/* 
  The users collection will have the following fields:
  - email: String
  - login: String
  - image: String
  - campus: String
*/

//router.use(ensureAuthenticated);


router.get("/", async (req, res) => {
  try {
    controller.getAll().then((results) => {
      res.send(results).status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting users");
  }
});

router.get("/:id", async (req, res) => {
  try {
    controller.getById(req.params.id).then((result) => {
      if (!result) res.send("Not found").status(404);
      else res.send(result).status(200);
    }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(" Error getting user");
  }
});

router.post("/", async (req, res) => {
  try {
    controller.add(req.body).then((result) => {
      res.send(result).status(201);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    controller.update(req.params.id, req.body).then((result) => {
      res.send(result).status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    controller.delete(req.params.id).then((result) => {
      res.send(result).status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
