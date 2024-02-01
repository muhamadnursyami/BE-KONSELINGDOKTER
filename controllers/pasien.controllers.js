const Pasien = require("../models/pasien");
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
        message: "Data berhasil di ambil",
        dataPasien,
      });
    } catch (error) {
      res.status(500).json(`Gagal mengambil data :${error.message} `);
    }
  },
};
