const mongoose = require('mongoose');
const { Schema } = mongoose;

const visaDocumentSchema = new Schema({
    userid: {type: String, require: true, unique: true,},
    optReceipt: { 
      name: { type: String },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      feedback: { type: String } // Optional: To store HR feedback if rejected
  },
  optEAD: { 
      name: { type: String },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      feedback: { type: String } // Optional: To store HR feedback if rejected
  },
  i983: { 
      name: { type: String },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      feedback: { type: String } // Optional: To store HR feedback if rejected
  },
  i20: { 
      name: { type: String },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      feedback: { type: String } // Optional: To store HR feedback if rejected
  }

});

const VisaDocuments = mongoose.model('VisaDocuments', visaDocumentSchema);

module.exports = VisaDocuments;

