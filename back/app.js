require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");

const app = express();

const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());

//routes

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });
};

server();
