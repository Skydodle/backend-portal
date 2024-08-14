/** @format */
require('dotenv').config();

const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error', err));

const db = mongoose.connection;

module.exports = db;
