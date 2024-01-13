require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const allRoutes = require("./routes");
const db = require("./config/db");
// PORT
const PORT = process.env.PORT || 3000;

// JALANKAN DB DAN CHECK CONNECTION
db.then(() => {
  console.log("Database is connection");
}).catch(() => {
  console.log("Failed is connection");
});

//CORS
app.use(cors());
app.use(express.json());
// SEMUA ROUTE
app.use(allRoutes);

// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
