const express = require("express");
const route = express.Router();
const {
  createPasien,
  getAllPasien,
  getPasienById,
  deletePasienById,
  editPasienById,
  getJadwalPasienById,
} = require("../controllers/pasien.controllers");
route.post("/", createPasien);
route.get("/", getAllPasien);
route.get("/:id", getPasienById);
route.get("/:id/jadwal", getJadwalPasienById);
route.delete("/:id", deletePasienById);
route.put("/:id", editPasienById);
module.exports = route;
