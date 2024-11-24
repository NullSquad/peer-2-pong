import express from "express";
import index from "./routes/index.js"
import users from "./routes/users.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/", index);
app.use("/users", users);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send("Uh oh! An unexpected error occured.");
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});