import express from "express";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import matches from "./routes/matches.js";
import competitions from "./routes/competitions.js";

//Testin agenda
import db from "./db/connection.js";
import Agenda	from "agenda";

const mongoConnectionString = `${process.env.DB_URI}` || "";
console.log(`\n\n\n${mongoConnectionString}\n\n\n`);
const	agenda = new Agenda({db: {address: mongoConnectionString}});

agenda.define("update competition matches", (job) => console.log(`${job}`));
agenda.start();

db.createCollection("matches");
//

const { PORT = 5000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/users", users);
app.use("/matches", matches);
app.use("/competitions", competitions);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
