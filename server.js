//require("dotenv").config;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const boards = require("./routes/boards");
const tasks = require("./routes/tasks");
const users = require("./routes/users");

app.use(
  cors({
    origin: "http://localhost:5173", //to allow requests
  })
);

mongoose
  .connect("mongodb://localhost/project-grid")
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("cannot connect to MongoDB", err));

app.use(express.json());
app.use("/api/boards", boards);
app.use("/api/tasks", tasks);
app.use("/api/users", users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
