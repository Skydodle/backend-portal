const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Employee' },

  onboardingStatus: {
    type: String,
    enum: ['Not Started', 'Pending', 'Approved', 'Rejected'],
    default: 'Not Started',
  },

  // profilePicture: { type: String, default: 'path/to/default/profile-picture.png' },
  profilePicture: { type: String},

  // Onboarding and Profile Information (optional for now)
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },

  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    required:true
  },
  cellPhoneNumber: { type: String, required: true},
  workPhoneNumber: { type: String },
  car: {
    make: { type: String },
    model: { type: String },
    color: { type: String }
  },
  ssn: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'I do not wish to answer'] },
  citizenship: {
    isCitizenOrPermanentResident: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['Green Card', 'Citizen', 'H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other']
    },
    visaDetails: {
      visaTitle: { type: String },
      optReceipt: { type: String }, // for F1(CPT/OPT)
      startDate: { type: Date },
      endDate: { type: Date }
    }
  },
  driverLicense: {
    hasDriverLicense: { type: Boolean, required: true },
    licenseNumber: { type: String },
    expirationDate: { type: Date },
    licenseCopy: { type: String } // path to uploaded copy
  },

  emergencyContacts: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    relationship: { type: String, required: true }
  }],
  feedback: {
    type: String,
    default: '',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
