const express = require("express");
const route = express.Router();
const {
  createdBooking,
  deleteBooking,
  editBooking,
  getAllBooking,
  getBookingById,
} = require("../controllers/booking.controller");
const { authenticateToken, authorizationRoles } = require("../middleware/auth");
route.get("/", authenticateToken, authorizationRoles("admin"), getAllBooking);
route.get(
  "/:id",
  authenticateToken,
  authorizationRoles("admin", "konselor", "pasien"),
  getBookingById
);
route.post(
  "/",
  authenticateToken,
  authorizationRoles("admin", "pasien"),
  createdBooking
);
route.put(
  "/:id",
  authenticateToken,
  authorizationRoles("admin", "pasien"),
  editBooking
);
route.delete(
  "/:id",
  authenticateToken,
  authorizationRoles("admin"),
  deleteBooking
);

module.exports = route;
