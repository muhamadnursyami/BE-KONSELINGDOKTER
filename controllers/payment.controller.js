const Payment = require("../models/payment");
const Booking = require("../models/booking");
module.exports = {
  createdPayment: async (req, res) => {
    const data = req.body;
    try {
      const createdDataPayment = await Payment.create(data);

      res.json({
        message: " Berhasil membuat data Payment",
        createdDataPayment,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat data ${error}`,
      });
    }
  },

  getAllPayment: async (req, res) => {
    const allDataPayment = await Payment.find().populate({
      path: "dataBooking",
      select: "_id tanggal waktu status",
      populate: {
        path: "pasien konselor jenisKonseling",
        select: "namaPasien nama jenis harga platformPertemuan",
      },
    });

    res.json({
      message: "berhasil mendapatkan data payment",
      allDataPayment,
    });
  },

  getPaymentById: async (req, res) => {
    const { id } = req.params;
    try {
      // kita bisa menambahkan populate didalam populate
      const dataPaymentById = await Payment.findById(id).populate({
        path: "dataBooking",
        select: "_id tanggal  waktu status",
        populate: {
          path: "pasien konselor jenisKonseling",
          select: "namaPasien nama jenis harga platformPertemuan",
        },
      });
      res.json(dataPaymentById);
    } catch (error) {
      res.status.json({
        message: `gagal mendapatkan data payment by id ${error}`,
      });
    }
  },
  updatePayment: async (req, res) => {
    const { id } = req.params;
    const { statusPembayaran, statusBooking } = req.body;
    try {
      const updatePayment = await Payment.findByIdAndUpdate(
        id,
        {
          // kenapa menggunakan $set?
          //   sebenarnya kita bisa mengupdate tanpa $set
          // tetapi sangat di rekomendasikan jika kita ingin mengubah
          //   sesuatu dalam bidang tertentu tanpa mengubah semua isi nya $set
          // $set sangat direkomendikasi karena supaya lebih spesifik  dan kejelasan kode
          // bahwa kita ingin menge $set / menambahkan update di statusPembayaran
          // pada tabel payment, tanpa menggangu isi attriburt lainya seperti
          // tanggalBayar, metodePembayaran dan lain lain
          $set: {
            statusPembayaran: statusPembayaran,
          },
        },
        { new: true }
      );
      //  updatePayment.dataBooking adalah suatu id dari tabel booking
      // yang didapat dari isi attribut tabel payment.
      //   jadi setelah kita updatePayment, maka hasilnya itu berupa objeck
      //  yang isi adalah attribute dari tabel payment, kemudian ambil attribute
      // dataBooking yang berisi id dari tabel booking
      await Booking.findByIdAndUpdate(updatePayment.dataBooking, {
        $set: { status: statusBooking },
      });

      res.json({
        message: "Berhasil mengupdate payment",
        data: updatePayment,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mengupdate payment ${error}`,
      });
    }
  },
  deletePayment: async (req, res) => {
    const { id } = req.params;
    try {
      await Payment.findByIdAndDelete(id);
      res.json({
        message: "Berhasil menghapus data payment",
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal menghapus data payment ${error}`,
      });
    }
  },
};
