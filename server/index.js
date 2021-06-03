const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const db = require("./models");
const { appPort: port } = require("./config/app");

/* Eencoding data */

app.use(express.json());

/* Routes */

const postRoute = require("./routes/Posts");
app.use("/posts", postRoute);

const commentsRoute = require("./routes/Comments");
app.use("/comments", commentsRoute);

/* DOTENV */
const dotenv = require("dotenv");
dotenv.config();

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server working on port ${port}`);
  });
});
