const express = require("express");
const app = express();
const boards = require("./routes/boards");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/project-grid")
  .then(() => console.log("connecting to mongodb..."))
  .catch((err) => console.log("cannot connect to mongodb...", err));

app.use(express.json());
app.use("/api/boards", boards);
app.use("/api/tasks", tasks);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
