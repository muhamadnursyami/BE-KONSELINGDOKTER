const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  metodePembayaran: String,
  tanggalBayar: Date,
  statusPembayaran: {
    type: String,
    default: "Pending",
  },
  dataBooking: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
