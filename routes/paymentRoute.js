const express = require("express");
const route = express.Router();

const {
  createdPayment,
  getAllPayment,
  deletePayment,
  getPaymentById,
  updatePayment,
} = require("../controllers/payment.controller");

route.get("/", getAllPayment);
route.get("/:id", getPaymentById);
route.post("/", createdPayment);
route.put("/:id", updatePayment);
route.post("/:id", deletePayment);
module.exports = route;
