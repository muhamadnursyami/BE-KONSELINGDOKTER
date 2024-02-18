const express = require("express");
const route = express.Router();
const {
  getAllAdmin,
  createAdmin,
  getAdminById,
  deleteAdminById,
  editAdmin,
} = require("../controllers/admin.controller");

const { authenticateToken, authorizationRoles } = require("../middleware/auth");

route.post("/", createAdmin);
route.get("/", authenticateToken, authorizationRoles("admin"), getAllAdmin);
route.get("/:id", authenticateToken, authorizationRoles("admin"), getAdminById);
route.put("/:id", authenticateToken, authorizationRoles("admin"), editAdmin);
route.delete(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  deleteAdminById
);

module.exports = route;
