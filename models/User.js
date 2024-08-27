const mongoose = require('mongoose');
const { Schema } = mongoose;

const refType = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Employee' },
  assignedHouse: {
    type: refType,
    ref: 'House',
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
