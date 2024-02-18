const express = require("express");
const {
  createSpesialisasi,
  getAllSpesialis,
  getSpesialisById,
  editSpesialis,
  deleteSpesialis,
} = require("../controllers/spesialisasi.controller");

const route = express.Router();
const { authenticateToken, authorizationRoles } = require("../middleware/auth");
route.post(
  "/",
  authenticateToken,
  authorizationRoles("admin"),
  createSpesialisasi
);
route.get(
  "/",
  authenticateToken,
  authorizationRoles("admin", "konselor"),
  getAllSpesialis
);
route.get(
  "/:id",
  authenticateToken,
  authorizationRoles("admin", "konselor"),
  getSpesialisById
);
route.put(
  "/:id",
  authenticateToken,
  authorizationRoles("admin", "konselor"),
  editSpesialis
);
route.delete(
  "/id",
  authenticateToken,
  authorizationRoles("admin"),
  deleteSpesialis
);
module.exports = route;
