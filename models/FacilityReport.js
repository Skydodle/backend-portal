const mongoose = require('mongoose');
const { Schema } = mongoose;

const facilityReportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // References the User model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to current date/time
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'], // Define the possible statuses
      default: 'Open',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment', // References the Comment model
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

const FacilityReport = mongoose.model('FacilityReport', facilityReportSchema);

module.exports = FacilityReport;
