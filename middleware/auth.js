require("dotenv").config();
const jwt = require("jsonwebtoken");
// Sebuah fungsi untuk menghandle/ mengecek user apakah sudah login atau belum dan ada atau tidak memiliki token
const authenticateToken = async (req, res, next) => {
  try {
    let token;

    //   ambil data token dari  bearer  token dari header
    const tokenUser = req.headers.authorization;
    // jika ada variabel tokenUser ada dan
    //  tokenUser menggunakan function startWith yang artinya
    // tokenUser akan di cek apakah kata depannya itu ada Bearer atau tidak
    // jika tidak ada maka false jika ada true, ini berguna dalam skema keamanan
    // jika ada orang yang mendapatkan token secara ilegal tanpa input Bearer.
    if (tokenUser && tokenUser.startsWith("Bearer")) {
      token = tokenUser.split(" ")[1];
    }

    //   jika tidak ada
    if (!token) {
      throw new Error("Authenticated Invalid");
    }

    //   memverifikasi sebuah token
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    // memasukan verify token  untuk di simpan  kedalam req.user
    // tujuany agardapat di akses dan digunakan oleh middlware selanjutnya
    // dan ini adalah bawaan dari kode, jika sudah memverify maka langsung disimpan kedalam req.user
    req.user = verifyToken;
    //  jika berhasil maka selanjutnya jalankan middleware dibawahnya
    next();
  } catch (error) {
    next(error);
  }
};
// membuat middlware untuk role apa saya yang dizinkan untuk mengakses tertentu
const authorizationRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Unauthorized to access this route");
    }
    next();
  };
};

// ! TOLONG PERHATIKAN CARA IMPORT NYA
// ! KARENA MEMPENGARUHI SAAT DI EXPORT
// ! JIKA EXPORT NYA MENGGUNA TANDA {}
// ! MAKA IMPORTNYA JUGA MENGGUNAKAN TANDA {}
// ! JIKA TIDAK ADA MAKA TIDAK DIBIKIN JUGA

module.exports = { authenticateToken, authorizationRoles };
// module.exports = authenticateToken;
