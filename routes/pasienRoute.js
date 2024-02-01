const express = require("express");
const route = express.Router();
const {
  createPasien,
  getAllPasien,
} = require("../controllers/pasien.controllers");
route.post("/", createPasien);
route.get("/", getAllPasien);

module.exports = route;
