const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const api = require("./src/api");

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.post("/", api.sendMessage);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`${process.env.HOST} listening at port ${process.env.PORT}`)
);
