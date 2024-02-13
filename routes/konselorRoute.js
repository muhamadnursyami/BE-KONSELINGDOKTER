const express = require("express");
const upload = require("../utils/multer");
const {
  getAllKonselor,
  getDataKonselor,
  getKonselorById,
  getJadwalKonselorById,
  createKonselor,

  editKonselor,
  deleteKonselor,
} = require("../controllers/konselor.controller");

const route = express.Router();

route.get("/", getAllKonselor);
route.get("/data-konselor", getDataKonselor);
route.get("/:id", getKonselorById);
route.get("/:id/jadwal", getJadwalKonselorById);
route.post("/", upload.single("avatar"), createKonselor);
route.put("/:id", upload.single("avatar"), editKonselor);
route.delete("/:id", deleteKonselor);
module.exports = route;
