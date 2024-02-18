const express = require("express");
const route = express.Router();

const {
  createdPayment,
  getAllPayment,
  deletePayment,
  getPaymentById,
  updatePayment,
} = require("../controllers/payment.controller");
const { authenticateToken, authorizationRoles } = require("../middleware/auth");

route.get("/", authenticateToken, authorizationRoles("admin"), getAllPayment);
route.get(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  getPaymentById
);
route.post(
  "/",
  authenticateToken,
  authorizationRoles("admin", "pasien"),
  createdPayment
);
route.put(
  "/:id",
  authenticateToken,
  authorizationRoles("admin", "konselor"),
  updatePayment
);
route.post(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  deletePayment
);
module.exports = route;
