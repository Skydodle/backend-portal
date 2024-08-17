const mongoose = require('mongoose');
const { Schema } = mongoose;


const refType=Schema.Types.ObjectId;
const employeeSchema = new Schema({

  userId:{
    type:refType,
    ref:'User',
  },
  onboardingStatus: {
    type: String,
    enum: ['Not Started', 'Pending', 'Approved', 'Rejected'],
    default: 'Not Started',
  },

  profilePicture: { type: String, default: '' },

  // Onboarding and Profile Information (optional for now)
  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
  preferredName: { type: String },

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  cellPhoneNumber: { type: String },
  workPhoneNumber: { type: String },
  car: {
    make: { type: String },
    model: { type: String },
    color: { type: String }
  },
  ssn: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'I do not wish to answer'] },
  citizenship: {
    visaStatus: { type: String },
    document: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    // optDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaDocuments' }
  },
  
  driverLicense: {
    hasDriverLicense: { type: Boolean },
    licenseNumber: { type: String },
    expirationDate: { type: Date },
    licenseCopy: { type: String }
  },

  emergencyContacts: [{
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String }
  }],
  feedback: {
    type: String,
    default: '',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
