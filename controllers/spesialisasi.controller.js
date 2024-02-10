const Spesialis = require("../models/spesialis");
module.exports = {
  createSpesialisasi: async (req, res) => {
    const data = req.body;
    try {
      await Spesialis.create(data);
      res.json({
        message: `Berhasil membuat data spesialis`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal membuat data spesialis ${error}`,
      });
    }
  },
  getSpesialisById: async (req, res) => {
    const { id } = req.params;
    try {
      const spesialisById = await Spesialis.findById(id);

      res.json({
        message: "berhasil mendapatkan data ById",
        spesialisById,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ById ${error}`,
      });
    }
  },
  getAllSpesialis: async (req, res) => {
    try {
      const allSpesialis = await Spesialis.find();
      res.json({
        message: "Berhasil mendapatkan data",
        allSpesialis,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mendapatkan data ${error}`,
      });
    }
  },

  editSpesialis: async (req, res) => {
    const { id } = req.params;
    const newdata = req.body;
    try {
      const updateData = await Spesialis.findByIdAndUpdate(id, newdata, {
        new: true,
      });

      res.json({
        message: "berhasil menupdate data",
        updateData,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal mengedit spesialis ${error}`,
      });
    }
  },

  deleteSpesialis: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteDataSpesialis = await Spesialis.findByIdAndDelete(id);

      res.json({
        message: "Berhasil menghapus data",
        deleteDataSpesialis,
      });
    } catch (error) {
      res.status(500).json({
        message: `Gagal menghapus data ${error}`,
      });
    }
  },
};
