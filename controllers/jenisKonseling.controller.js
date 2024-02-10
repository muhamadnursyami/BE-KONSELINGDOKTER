const JenisKonseling = require("../models/jenisKonseling");

module.exports = {
  createJenisKonseling: async (req, res) => {
    const data = req.body;
    try {
      await JenisKonseling.create(data);

      res.json({
        message: "berhasil membuat data jenisKonseling",
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat jenis konseling ${error}`,
      });
    }
  },
  getAllJenisKonseling: async (req, res) => {
    try {
      const allDataJenisKonseling = await JenisKonseling.find();

      res.json({
        message: "Berhasil mendapatkan data",
        allDataJenisKonseling,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ${error}`,
      });
    }
  },

  getJenisKonselingById: async (req, res) => {
    const { id } = req.params;
    try {
      const dataJenisKonselingById = await JenisKonseling.findById(id);

      res.json({
        message: "berhasil mendapatkan data By Id",
        dataJenisKonselingById,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ${error}`,
      });
    }
  },
  editJenisKonseling: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      const dataJenisKonselingUpdate = await JenisKonseling.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      res.json({
        message: "berhasil mengupdate data",
        dataJenisKonselingUpdate,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mengupdate data ${error}`,
      });
    }
  },

  deleteJenisKonseling: async (req, res) => {
    const { id } = req.params;

    try {
      await JenisKonseling.findByIdAndDelete(id);

      res.json({
        message: "Berhasil menghapus data",
      });
    } catch (error) {
      res.status.json({
        message: `Gagal menghapus data ${error} `,
      });
    }
  },
};
