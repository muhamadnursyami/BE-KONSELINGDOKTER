require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const Konselor = require("../models/konselor");
const Pasien = require("../models/pasien");
module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      //  cari akun user dari semua koleksi (admin, konselor, pasien)
      const adminUser = await Admin.findOne({ email });
      const konselorUser = await Konselor.findOne({ email });
      const pasienUser = await Pasien.findOne({ email });

      //   dari 3 variabel diatas secara langsung dapat di tentukan rolenya
      //   karena dari schema tablenya sudah di tentukan
      // jadi user login dan dapat ditemukan datanya berdasarkan data yang ada
      // pada setiap 3 table diatas sekalian rolenya masing masing
      let user = adminUser || konselorUser || pasienUser;

      //   jika user tidak ada
      if (!user) {
        throw new Error("Invalid Credential : User not Found");
      }
      // membandingkan password yang di kirim oleh user dengan password yang ada di database
      const comparePassword = bcrypt.compareSync(password, user.password);

      //   jika password salah
      if (!comparePassword) {
        throw new Error("Invalid Credential : Email or Password is incorrect");
      }

      //   membuat sebuah token
      //   syarat wajib 2 paramater yaitu object yang harus di isi
      // dan key secret jwt
      const token = jwt.sign(
        {
          // 3 ini adalah isi dari token nya nanti jika di cek di jwt oi
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_KEY
      );
      //   ketika berhasil login maka akan mengirim kan data userID, Role dan token
      res.json({
        message: "Berhasil login",
        userID: user._id,
        role: user.role,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal Login ${error}`,
      });
    }
  },
};
