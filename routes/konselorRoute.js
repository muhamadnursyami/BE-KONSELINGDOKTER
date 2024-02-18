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
const { authenticateToken, authorizationRoles } = require("../middleware/auth");
route.get(
  "/",
  authenticateToken,
  authorizationRoles("admin", "pasien"),
  getAllKonselor
);
route.get("/data-konselor", getDataKonselor);
route.get(
  "/:id",
  authenticateToken,
  authorizationRoles("admin", "konselor", "pasien"),
  getKonselorById
);
route.get(
  "/:id/jadwal",
  authenticateToken,
  authorizationRoles("admin", "konselor"),
  getJadwalKonselorById
);
route.post(
  "/",
  upload.single("avatar"),
  authenticateToken,
  authorizationRoles("admin"),
  createKonselor
);
route.put(
  "/:id",
  upload.single("avatar"),
  authenticateToken,
  authorizationRoles("admin", "konselor"),
  editKonselor
);
route.delete(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  deleteKonselor
);
module.exports = route;
