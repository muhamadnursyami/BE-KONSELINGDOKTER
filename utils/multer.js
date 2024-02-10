const multer = require("multer");
const path = require("path");

// Konfigurasi Multer
// tujuan untuk membuat rules jika terdapat multipartform data
module.exports = multer({
  // kita membuat sebuah function bernama storage, karena dari dokumentasi multer terkait nama
  // yang didalamnya  memangill  fungsi multer.diskStorage
  // yang tedapat option seperti membuat destinansi
  // tempat file itu disimpan dan mengubah nama file yang di upload user
  // itu adalah beberapa konfigurasi yang bisa di lakukan
  // pada fungsi diskStorage, hanya saja pada kasus ini
  //   kita tidak membuat destinasi tempat penyimpanan file
  // karena file akan di simpan di cloudinary, dan untuk nama
  // filenya mengikuti nama file yang di upload oleh user
  storage: multer.diskStorage({}),
  //   membuat  function bernama fileFilter, karena dari dokumentasi terkait nama fileFilter
  // bertujuan untuk memfilter file  yang di upload
  // memilik 3 paramater req/ request, file : di upload,
  // cb adalah callback, dalam meggunakan fileFilter harus
  // harus menggunakan cb untuk mengidentifikasi apakah
  // file yang di upload itu berhasil atau tidak.
  // package path digunakan untuk mengambil
  // ekstensi dari file yang di upload misal jpg
  //  kemudian di exstrak menjadi string.
  // file.originalname itu mengambil nama dan file
  // yang di upload user dari computer user, seperti originalfile tanpa di ubah oleh system
  // jadi isi variabel ext adalah berupa string extension yang di ambil dari file
  // yang akan di bandingan pada logic if statement
  // fungsi cb /callback berfungsi untuk memberikan respon umpan balik.
  // cb memilik 2 paramater yaitu null/ pesan error dan false /true
  //  jika file yang di upload tidak sesuai maka akan
  // mengirim kan sebuah pesan error dan false yang artinya
  // file gagal di upload
  // jika file sesuai maka mengirimkan null yang artinya tidak terjadi kesalahan
  // dan true bahwa filenya diterima
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      //   jika cb ini di eksekusi maka return berhenti sampai sini, dan kode dibawah tidak di eksekusi
      cb(new Error("FILE TYPE IS NOT SUPPORTED"), false);

      return;
    }
    cb(null, true);
  },
});
