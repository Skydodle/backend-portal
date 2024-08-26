const mongoose = require('mongoose');
const { Schema } = mongoose;

const refType = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Employee' },
  phoneNumber: {
    type: refType,
    ref: 'Employee',
    default: null,
  },
  assignedHouse: {
    type: refType,
    ref: 'House',
    default: null,
  },
});

// Method to return a default string if phoneNumber is not set
userSchema.methods.getPhoneNumber = function () {
  return this.phoneNumber || 'Not Provided';
};

const User = mongoose.model('User', userSchema);

module.exports = User;
