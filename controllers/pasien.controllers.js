const Pasien = require("../models/pasien");
const Booking = require("../models/booking");
const bcrypt = require("bcrypt");

module.exports = {
  createPasien: async (req, res) => {
    const { nama, email, password, noTelepon } = req.body;

    try {
      if (!nama || !email || !password || !noTelepon) {
        throw new Error("Tolong isi semua inputan");
      }
      const existingEmail = await Pasien.findOne({ email });
      if (existingEmail) {
        throw new Error("Email is Already");
      }
      const hashedPassword = await bcrypt.hashSync(password, 12);

      await Pasien.create({
        nama,
        email,
        hashedPassword,
        noTelepon,
      });
      res.json({
        message: "Berhasil membuat data",
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat data: ${error.message}`,
      });
    }
  },
  getAllPasien: async (req, res) => {
    try {
      const dataPasien = await Pasien.find();

      res.json({
        dataPasien,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mengambil data :${error.message} `,
      });
    }
  },
  getPasienById: async (req, res) => {
    const { id } = req.params;
    try {
      const dataPasienById = await Pasien.findById(id);
      res.json(dataPasienById);
    } catch (error) {
      res.status(500).json({
        message: `Id ini Tidak di temukan :${id}`,
      });
    }
  },
  deletePasienById: async (req, res) => {
    const { id } = req.params;
    try {
      await Pasien.findByIdAndDelete(id);
      res.json({
        message: "Berhasil menghapus",
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal menghapus data pasien ${error}`,
      });
    }
  },
  editPasienById: async (req, res) => {
    const { id } = req.params;
    const dataNew = req.body;
    try {
      const updatePasien = await Pasien.findByIdAndUpdate(id, dataNew, {
        //  new true maksudnya mengembalikan document yang telah di modifikasi  dari pada yang asli
        new: true,
      });
      res.json({
        message: `Berhasil mengupdate data`,
        updatePasien,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mengedit data ${error}`,
      });
    }
  },
  getJadwalPasienById: async (req, res) => {
    const { id } = req.params;
    try {
      // maksud kode di bawah ini
      // mencari data booking berdasarkan
      // id pasien, kemudian maksud populate itu
      // ngebuka data tabel/ path pasien dan
      // select atau ambil data dari tabel pasien
      //  hanya yang pilih/diselect
      // yaitu id dan namaPasien
      // penjelesan populate berikutnya sama saja.
      const booking = await Booking.find({
        pasien: id,
      })
        .populate({
          path: "pasien",
          select: "_id namaPasien",
        })
        .populate({
          path: "konselor",
          select: "_id nama",
        })
        .populate({
          path: "jenisKonseling",
          select: "jenis harga platformPertemuan",
        });

      res.json(booking);
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data konselor dengan id :${id}, ${error}`,
      });
    }
  },
};
