const express = require("express");
const route = express.Router();
const pasienRoute = require("./pasienRoute");
const adminRoute = require("./adminRoute");
const spesialisasiRoute = require("./spesialisasiRoute");
const konselorRoute = require("./konselorRoute");
const jenisKonselingRoute = require("./jenisKonselingRoute");
const authRoute = require("./authRoute");
const bookingRoute = require("./bookingRoute");
const paymentRoute = require("./paymentRoute");
route.get("/", (req, res) => {
  try {
    res.status(200).json("Selamat Datang di Server Konseler Dokter");
  } catch (error) {
    res.status(500).json("Interval Error");
    console.log(error);
  }
});

route.use("/pasiens", pasienRoute);
route.use("/admins", adminRoute);
route.use("/spesialisasis", spesialisasiRoute);
route.use("/konselors", konselorRoute);
route.use("/jenisKonselings", jenisKonselingRoute);
route.use("/auth", authRoute);
route.use("/bookings", bookingRoute);
route.use("/payments", paymentRoute);
module.exports = route;
