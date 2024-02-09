const express = require("express");
const route = express.Router();
const {
  getAllAdmin,
  createAdmin,
  getAdminById,
  deleteAdminById,
  editAdmin,
} = require("../controllers/admin.controller");
route.post("/", createAdmin);
route.get("/", getAllAdmin);

route.get("/:id", getAdminById);
route.put("/:id", editAdmin);
route.delete("/:id", deleteAdminById);

module.exports = route;
