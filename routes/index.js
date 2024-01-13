const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.json("Selamat Datang di Server ManahSucita");
});

module.exports = route;
