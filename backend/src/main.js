import express from "express";
import passport from "passport";
import session from "express-session";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import matches from "./routes/matches.js";
import competitions from "./routes/competitions.js";
import verifyAuth from "./middleware/auth.js";

const { PORT = 5000, CLIENT_SECRET } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);
app.use("/users", verifyAuth, users);
app.use("/matches", verifyAuth, matches);
// app.use("/competitions", verifyAuth, competitions);
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
