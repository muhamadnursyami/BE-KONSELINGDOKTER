const mongoose = require("mongoose");

const konselorSchema = new mongoose.Schema({
  nama: {
    type: String,
  },
  bio: {
    type: String,
    default: "Biodata Konselor",
  },
  motivasi: {
    type: String,
    default: "Motivasi Konselor",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  noTelepon: {
    type: String,
  },
  avatar: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png",
  },
  spesialis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spesialis",
    },
  ],
  role: [
    {
      type: String,
      default: "konselor",
    },
  ],
});

module.exports = mongoose.model("Konselor", konselorSchema);
