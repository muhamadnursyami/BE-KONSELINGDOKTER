const mongoose = require("mongoose");

const jenisKonselingSchema = new mongoose.Schema({
  jenis: String,
  harga: {
    type: Number,
  },
  platformPertemuan: String,
});

module.exports = mongoose.model("JenisKonseling", jenisKonselingSchema);
