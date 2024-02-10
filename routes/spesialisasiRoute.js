const express = require("express");
const {
  createSpesialisasi,
  getAllSpesialis,
  getSpesialisById,
  editSpesialis,
  deleteSpesialis,
} = require("../controllers/spesialisasi.controller");
const route = express.Router();

route.post("/", createSpesialisasi);
route.get("/", getAllSpesialis);
route.get("/:id", getSpesialisById);
route.put("/:id", editSpesialis);
route.delete("/id", deleteSpesialis);
module.exports = route;
