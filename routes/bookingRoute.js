const express = require("express");
const route = express.Router();
const {
  createdBooking,
  deleteBooking,
  editBooking,
  getAllBooking,
  getBookingById,
} = require("../controllers/booking.controller");

route.get("/", getAllBooking);
route.get("/:id", getBookingById);
route.post("/", createdBooking);
route.put("/:id", editBooking);
route.delete("/:id", deleteBooking);

module.exports = route;
