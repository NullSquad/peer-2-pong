import express from "express";
import controller from "../controllers/competitions.js";
import matchController from "../controllers/matches.js";

const router = express.Router();

router.get("/", async (req, res) => {
  controller
    .getAll()
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err.message));
});

router.get("/:id", async (req, res) => {
  controller
    .getById(req.params.id)
    .then((result) => {
      if (!result) res.status(404).send("Not found");
      else res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err.message));
});

router.post("/", async (req, res) => {
  controller
    .add(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(500).send(err.message));
});

router.patch("/:id", async (req, res) => {
  controller
    .update(req.params.id, req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err.message));
});

router.delete("/:id", async (req, res) => {
  controller
    .delete(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err.message));
});

router.get("/:id/matches/me", async (req, res) => {
  matchController
    .getByCompetitionAndPlayer(req.params.id, req.user.id)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err.message));
});

router.post("/:id/join", async (req, res) => {
  controller
    .join(req.params.id, req.user)
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(500).send(err.message));
});

export default router;
