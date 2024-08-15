const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Employee' },

  // Onboarding and Profile Information (optional for now)
  firstName: String,
  lastName: String,
  middleName: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  phoneNumber: String,
  workPhoneNumber: String,
  ssn: String,
  dob: Date,
  gender: String,
  workAuthorization: {
    type: String, // e.g., "H1-B", "OPT", etc.
    startDate: Date,
    endDate: Date,
    documents: [String], // list of document URLs or references
  },
  driverLicense: {
    number: String,
    expirationDate: Date,
    document: String, // URL or reference to the document
  },
  emergencyContact: [
    {
      name: String,
      phone: String,
      relationship: String,
    },
  ],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
