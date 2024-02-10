const express = require("express");
const route = express.Router();
const {
  createJenisKonseling,
  editJenisKonseling,
  deleteJenisKonseling,
  getAllJenisKonseling,
  getJenisKonselingById,
} = require("../controllers/jenisKonseling.controller");
route.get("/", getAllJenisKonseling);
route.get("/:id", getJenisKonselingById);
route.post("/", createJenisKonseling);
route.put("/:id", editJenisKonseling);
route.delete("/:id", deleteJenisKonseling);

module.exports = route;
