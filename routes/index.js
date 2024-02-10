const express = require("express");
const route = express.Router();
const pasienRoute = require("./pasienRoute");
const adminRoute = require("./adminRoute");
const spesialisasiRoute = require("./spesialisasiRoute");
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
module.exports = route;
