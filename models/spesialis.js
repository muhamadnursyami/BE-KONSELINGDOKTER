const mongoose = require("mongoose");

const spesialisSchema = new mongoose.Schema({
  namaSpesialis: String,
});

module.exports = mongoose.model("Spesialis", spesialisSchema);
