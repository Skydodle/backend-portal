const mongoose = require('mongoose');
const { Schema } = mongoose;

const houseSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    landlord: {
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String, // Assuming phone number is stored as a string
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    residents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
      },
    ],
    facilityInformation: {
      beds: {
        type: Number,
        default: 0,
      },
      mattresses: {
        type: Number,
        default: 0,
      },
      tables: {
        type: Number,
        default: 0,
      },
      chairs: {
        type: Number,
        default: 0,
      },
    },
    facilityReports: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FacilityReport', // References the FacilityReport model
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

const House = mongoose.model('House', houseSchema);

module.exports = House;
