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
// ! TOLONG PERHATIKAN CARA IMPORT NYA
// ! KARENA MEMPENGARUHI SAAT DI EXPORT
// ! JIKA EXPORT NYA MENGGUNA TANDA {}
// ! MAKA IMPORTNYA JUGA MENGGUNAKAN TANDA {}
// ! JIKA TIDAK ADA MAKA TIDAK DIBIKIN JUGA
// ! SEPERTI INI CONTOHNYA FUNCTION AUTHENTICATE TOKEN TERHUBUNG DENGAN MIDDLEWARE AUTH.JS
const { authenticateToken, authorizationRoles } = require("../middleware/auth");
// const authenticateToken = require("../middleware/auth");
// contoh penggunaan AUTHENTICATE DAN AUTHORIZATION
//! route.get("/", authenticateToken, authorizationRoles("admin"), getAllPasien);
route.post("/", createPasien);
route.get("/", getAllPasien);
route.get("/:id", getPasienById);
route.get("/:id/jadwal", getJadwalPasienById);
route.delete("/:id", deletePasienById);
route.put("/:id", editPasienById);
module.exports = route;
