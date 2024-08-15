/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Registered'],
    default: 'Pending',
  },
});

// Method to check if the token is expired
registrationTokenSchema.methods.isExpired = function () {
  return new Date() > this.expirationDate;
};

const RegistrationToken = mongoose.model('RegistrationToken', registrationTokenSchema);

module.exports = RegistrationToken;