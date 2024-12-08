import express from "express";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

const { PORT = 5000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/auth", auth);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
