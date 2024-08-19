const db = require('./connection');
const visaDocumentS = require('../models/VisaDocuments')


// for visa documents seed
const seedVisa = async () => {
    try {
      await visaDocumentS.create({
        userid: 'xxxxxx',
        optReceipt: {
            name: 'receipt',
        },
        optEAD: {
            name: 'ead',            
        },
        i983: {
            name: 'i983',           
        },
        i20: {
            name: 'i20',            
        }
    });   
    } catch (e) {
      console.error('Error seeding visa documents dataset', e)
    } finally {
      await db.close()
    }
  }
seedVisa()