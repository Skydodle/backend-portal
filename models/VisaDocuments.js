const mongoose = require('mongoose');
const { Schema } = mongoose;

const visaDocumentSchema = new Schema({
    userid: {type: String, require: true, unique: true,},
    optReceipt: { 
        name: { type: String },
        approved: { type: Boolean, default: false }
      },
      optEAD: { 
        name: { type: String },
        approved: { type: Boolean, default: false }
      },
      i983: { 
        name: { type: String },
        approved: { type: Boolean, default: false }
      },
      i20: { 
        name: { type: String },
        approved: { type: Boolean, default: false }
      }

});

const VisaDocuments = mongoose.model('VisaDocuments', visaDocumentSchema);

module.exports = VisaDocuments;

