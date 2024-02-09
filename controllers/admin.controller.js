const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

module.exports = {
  getAdminById: async (req, res) => {
    const { id } = req.params;
    try {
      const adminById = await Admin.findById(id);

      res.json({
        message: "Berhasil mendapatkan data ById",
        data: adminById,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ById ${error}`,
      });
    }
  },
  getAllAdmin: async (req, res) => {
    try {
      const admin = await Admin.find();

      res.json({
        message: "berhasil mendapatkan data",
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data allAdmin ${error}`,
      });
    }
  },
  createAdmin: async (req, res) => {
    const { nama, email, password } = req.body;
    try {
      // Cek apakah email sudah terdaftar
      const adminSudahTerdaftar = await Admin.findOne({ email });

      if (adminSudahTerdaftar) {
        throw new Error("Email sudah terdaftar");
      }
      //   menghashing passwrd
      const hashPasswordAdmin = await bcrypt.hashSync(password, 12);
      await Admin.create({
        nama,
        email,
        password: hashPasswordAdmin,
      });
      res.json({
        message: "berhasil membuat data",
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat data ${error}`,
      });
    }
  },
  deleteAdminById: async (req, res) => {
    const { id } = req.params;

    try {
      await Admin.findByIdAndDelete(id);

      res.json({
        message: `Berhasil menghapus data`,
      });
    } catch (error) {
      res.status(500).json({
        message: `gagal menghapus data ${error}`,
      });
    }
  },

  editAdmin: async (req, res) => {
    const { id } = req.params;
    const { email, nama } = req.body;
    try {
      const updateAdmin = await Admin.findByIdAndUpdate(
        id,
        { email, nama },
        {
          new: true,
        }
      );

      res.json({
        message: "berhasil menupdate data admin",
        updateAdmin,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal berubah data ${error}`,
      });
    }
  },
};
