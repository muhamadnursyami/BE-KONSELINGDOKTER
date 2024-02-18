const express = require("express");
const route = express.Router();
const {
  createJenisKonseling,
  editJenisKonseling,
  deleteJenisKonseling,
  getAllJenisKonseling,
  getJenisKonselingById,
} = require("../controllers/jenisKonseling.controller");
const { authenticateToken, authorizationRoles } = require("../middleware/auth");
route.get("/", getAllJenisKonseling);
route.get("/:id", getJenisKonselingById);
route.post(
  "/",
  authenticateToken,
  authorizationRoles("admin"),
  createJenisKonseling
);
route.put(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  editJenisKonseling
);
route.delete(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  deleteJenisKonseling
);

module.exports = route;
