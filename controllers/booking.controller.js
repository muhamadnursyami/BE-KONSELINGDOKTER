const Booking = require("../models/booking");
module.exports = {
  createdBooking: async (req, res) => {
    const data = req.body;
    try {
      const createData = await Booking.create(data);

      res.json({
        message: "Berhasil membuat data",
        createData,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat data ${error}`,
      });
    }
  },
  getAllBooking: async (req, res) => {
    try {
      const allDataBooking = await Booking.find()
        .populate({
          path: "pasien",
          select: "_id namaPasien noTelepon",
        })
        .populate({
          path: "konselor",
          select: "_id nama avatar spesialis",
        })
        .populate({
          path: "jenisKonseling",
          select: "jenis harga platformPertemuan",
        });

      res.json({
        message: "Berhasil mendapata data booking",
        allDataBooking,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ${error}`,
      });
    }
  },
  getBookingById: async (req, res) => {
    const { id } = req.params;
    try {
      const dataBookingById = await Booking.findById(id)
        .populate({
          path: "pasien",
          select: "_id namaPasien",
        })
        .populate({
          path: "konselor",
          select: "_id nama avatar",
          populate: {
            path: "spesialis",
            select: "namaSpesialis",
          },
        })
        .populate({
          path: "jenisKonseling",
          select: "jenis harga platformPertemuan",
        });

      res.json(dataBookingById);
    } catch (error) {
      res.status(500).json({
        messsag: `Gagal mendapat  boooking ById${error}`,
      });
    }
  },

  editBooking: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
      const updateDataBooking = await Booking.findByIdAndUpdate(id, newData, {
        new: true,
      });

      res.json({
        message: `Berhasil mengupdate Data`,
        updateDataBooking,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mengupdate booking ${error}`,
      });
    }
  },

  deleteBooking: async (req, res) => {
    const { id } = req.params;

    try {
      await Booking.findByIdAndDelete(id);
      res.json({
        message: `Berhasil menghapus data`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal menghapus data ${error}`,
      });
    }
  },
};
