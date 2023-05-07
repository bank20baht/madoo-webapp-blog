require("dotenv").config();
const connection = require("./db");
const express = require("express");
const app = express();
const articles = require("./routes/articles");
const cors = require("cors");

connection();
app.use(cors());
app.use(express.json());
app.use("/api/articles", articles);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));