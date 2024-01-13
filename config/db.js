require("dotenv").config();
const mongoose = require("mongoose");

const URL_DB = process.env.DB;
const db = mongoose.connect(URL_DB);

module.exports = db;
