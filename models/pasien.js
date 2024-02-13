const mongoose = require("mongoose");

const pasienSchema = new mongoose.Schema({
  namaPasien: String,
  email: String,
  password: String,
  alamat: String,
  noTelepon: String,
  role: { type: String, default: "pasien" },
});

module.exports = mongoose.model("Pasien", pasienSchema);
