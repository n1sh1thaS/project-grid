//require("dotenv").config;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const boards = require("./routes/boards");
const tasks = require("./routes/tasks");
const users = require("./routes/users");

mongoose
  .connect("mongodb://localhost/project-grid")
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("cannot connect to MongoDB", err));

app.use(express.json());
app.use("/api/boards", boards);
app.use("/api/tasks", tasks);
app.use("/api/users", users);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
