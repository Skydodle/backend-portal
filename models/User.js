/** @format */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: refType, ref: 'Product' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
