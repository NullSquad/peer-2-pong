import express from "express";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import matches from "./routes/match.js"; // Importa el router de match.js
import competitions from "./routes/competition.js"; // Importa el router de competition.js

const { PORT = 5000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/auth", auth);
app.use("/matches", matches); // Usa el router de match.js
app.use("/competitions", competitions); // Usa el router de competition.js

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("Uh oh! An unexpected error occurred.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
