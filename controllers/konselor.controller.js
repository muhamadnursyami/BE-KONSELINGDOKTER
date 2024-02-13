const Konselor = require("../models/konselor");
const Booking = require("../models/konselor");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const bcrypt = require("bcrypt");
module.exports = {
  createKonselor: async (req, res) => {
    try {
      // tempat menampung urlAvatar sementara
      let avatarUrl = "";

      //   jika ada file yang di upload dari req.file
      if (req.file) {
        // upload file tersebut yang tersimpan dalam req.file.path
        // kedalam cloudinary menggunakan fungsi uploader dan upload dari
        // dari library cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // jika ada maka setelah di upload / disimpan di cloudinary
        // ambil hasil upload dari yaitu result.secure_url
        // secure_url properti dari cloudinary, ada banyak pilihan silahkan di cek sendiri
        avatarUrl = result.secure_url;
      } else {
        // jika tidak ada upload oleh user,  maka defaultnya url ini
        avatarUrl = "https://i.stack.imgur.com/l60Hf.png";
      }

      //   menghashing password
      const hashPassword = await bcrypt.hashSync(req.body.password, 12);

      //   kumpulan semua data yang udah di ubah kedalam 1 variabel

      const konselorData = {
        // ambil semua req.body yang di kirim
        ...req.body,
        password: hashPassword,
        avatar: avatarUrl,
      };

      //   buat data konselor
      const createdKonselor = await Konselor.create(konselorData);

      res.json({
        message: "Berhasil membuat konselor",
        data: createdKonselor,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat konselor ${error}`,
      });
    }
  },

  getAllKonselor: async (req, res) => {
    try {
      const allKonselor = await Konselor.find().populate("spesialis");

      res.json({
        messsage: "Berhasil mendapatkan All Konselor",
        data: allKonselor,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan All Konselor ${error}`,
      });
    }
  },

  getDataKonselor: async (req, res) => {
    try {
      const konselors = await Konselor.find()
        .select("avatar nama spesialis")
        .populate("spesialis");
      res.json({
        message: "berhasil mendapatkan konselor",
        data: konselors,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ${error} `,
      });
    }
  },

  getKonselorById: async (req, res) => {
    const { id } = req.params;

    try {
      const konselorById = await Konselor.findById(id).populate("spesialis");
      res.json({
        message: `Berhasil mendapatkan konselor byid`,
        konselorById,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ById ${error}`,
      });
    }
  },
  getJadwalKonselorById: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await Booking.find({ konselor: id })
        .populate({
          path: "pasien",
          select: "_id namaPasien email noTelepon",
        })
        .populate({
          path: "konselor",
          select: "_id nama avatar",
        })
        .populate({
          path: "jenisKonseling",
          select: "jenis harga platformPertemuan",
        });

      res.json(booking);
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan jadwal konselor by id ${error}`,
      });
    }
  },

  editKonselor: async (req, res) => {
    const { id } = req.params;
    let newData = req.body;

    try {
      // ngecek apakah aada file yang di upload
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        newData.avatar = result.secure_url;
      }

      //   menghash password
      if (newData.password) {
        const hashPassword = await bcrypt.hashSync(newData.password, 12);
        // jika sudah di hash, maka password yang udah di hash
        // di masukan lagi kedalam data newData.password
        newData.password = hashPassword;
      }

      //   Update data Konselor
      const updateKonselor = await Konselor.findByIdAndUpdate(id, newData, {
        new: true,
      });

      res.json({
        message: "Berhasil merubah data",
        data: updateKonselor,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal merubah data konselor ${error}`,
      });
    }
  },

  deleteKonselor: async (req, res) => {
    const { id } = req.params;
    try {
      await Konselor.findByIdAndDelete(id);
      res.json({
        message: "Berhasil menghapus konselor",
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal menhapus konselor ${error}`,
      });
    }
  },
};
