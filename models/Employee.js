const mongoose = require('mongoose');
const { Schema } = mongoose;


const refType=Schema.Types.ObjectId;
const employeeSchema = new Schema({

  userId:{
    type:refType,
    ref:'User',
    required: true,

  },
  onboardingStatus: {
    type: String,
    enum: ['Not Started', 'Pending', 'Approved', 'Rejected'],
    default: 'Not Started',
  },

  profilePicture: { type: String, default: '' },

  // Onboarding and Profile Information (optional for now)
  firstName: { type: String, required: true  },
  lastName: { type: String, required: true  },
  middleName: { type: String },
  preferredName: { type: String },

  address: {
    unit: {type: String},
    street: { type: String, required: true  },
    city: { type: String, required: true  },
    state: { type: String, required: true  },
    zip: { type: String, required: true  }
  },
  cellPhoneNumber: { type: String, required: true  },
  workPhoneNumber: { type: String },
  car: {
    make: { type: String },
    model: { type: String },
    color: { type: String }
  },
  ssn: { type: String, required: true  },
  dateOfBirth: { type: Date, required: true  },
  gender: { type: String, enum: ['Male', 'Female', 'I do not wish to answer'] },
  citizenship: {
    visaStatus: { type: String, required: true},
    visaType:{ type: String},
    document: { type: String, default: '' },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    optDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaDocuments', default: null } // Use null as default for clarity
  },
  
  driverLicense: {
    hasDriverLicense: { type: Boolean },
    licenseNumber: { type: String },
    expirationDate: { type: Date },
    licenseCopy: { type: String }
  },
  reference:{
    firstName: { type: String, required: true  },
    lastName: { type: String, required: true  },
    middleName: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    relationship:{ type: String, required: true }
  },
  emergencyContacts: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String },
    relationship: { type: String, required: true }
  }],
  feedback: {
    type: String,
    default: '',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
