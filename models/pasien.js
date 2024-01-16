const mongoose = require("mongoose");

const pasienSchema = new mongoose.Schema({
  nama: String,
  email: String,
  password: String,
  alamat: String,
  noTelepon: String,
  role: { type: String, enum: ["pasien", "admin"], default: "pasien" },
});

module.exports = mongoose.model("Pasien", pasienSchema);
