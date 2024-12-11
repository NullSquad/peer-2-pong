import express from "express";
import controller from "../controllers/matches.js";

const router = express.Router();

/* 
  The matches collection will have the following fields:
  - competition: ObjectId
  - players: Array of objects with the following fields:
    - id: ObjectId
    - score: Number
  - date: Date
  - reportedBy: ObjectId
  - status:
      default: "Ready to play"
      after submit: "Waiting for confirmation"
      after accepting score: "Finished"
      after denying score: "Ready to play"
*/

router.get("/", async (req, res) => {
  try {
    controller.getAll().then((results) => {
      res.send(results).status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading matches");
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
    res.status(500).send("Error reading match");
  }
});

// router.get("/competition/:id", async (req, res) => {
//   try {
//     let collection = await db.collection("matches");
//     let query = { competition: new ObjectId(req.params.id) };
//     let results = await collection.find(query).toArray();
//     res.send(results).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error reading matches");
//   }
// });

router.post("/", async (req, res) => {
  try {
    controller.add(req.body).then((result) => {
      res.send(result).status(201);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding match");
  }
});

router.post("/report", async (req, res) => {
  try {
    controller.report(req.body.match, req.body.reportedBy).then((result) => {
      res.send(result).status(200);
    }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reporting match");
  }
});

// submit button: updates (patch) status, score, reporter. If the status is waiting, nothing changes
// accept score: updates date (is the date when the match ends), and status (finished)
// deny score: updates status (set -> to play), score (when deny -> set to 0)
// to debate: should back give player num info to frontend,  (each player should see themselves as player 1 on the left)
/*
  - status:
      default: "Ready to play"
      after submit: "Waiting for confirmation" -> update status, score and reporter
      after accepting score: "Finished" -> update date and status
      after denying score: "Ready to play"
*/

router.patch("/:id", async (req, res) => {
  try {
    controller.update(req.params.id, req.body).then((result) => {
      res.send(result).status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating match");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    controller.delete(req.params.id).then((result) => {
      res.send(result).status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting match");
  }
});

export default router;
