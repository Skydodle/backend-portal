const VisaDocuments = require('../models/VisaDocuments')
const fs = require('fs');
const { uploadFileToS3, getTemporaryUrlFromS3 } = require('../utils/s3Utils');
const path = require('path');
const Employee = require('../models/Employee');


// for initial, push opt receipt
const postEmployeeVisaDoc = async(req, res) => {
    // const { userid } = req.body;  // for testing without middleware
    const userid = req.user.id
    const username= req.user.username;
    const { documentType } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'File is required.' });
    }
    try {
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${username}-${documentType}${fileExtension}`;
        await uploadFileToS3(file.path, newFileName, file.mimetype);
        fs.unlinkSync(file.path);
    
        if (documentType === 'optReceipt') {
          // Handle OPT Receipt
          let visaDocument = await VisaDocuments.findOne({ userid: userid });
    
          if (visaDocument) {
            visaDocument.optReceipt = {
              name: newFileName,
              status: 'pending',
              feedback: ''
            };
            await visaDocument.save();
          } else {
            visaDocument = new VisaDocuments({
              userid: userid,
              optReceipt: {
                name: newFileName,
                status: 'pending',
                feedback: ''
              }
            });
            await visaDocument.save();
          }
    
          await Employee.findOneAndUpdate(
            { userId: userid },
            { 'citizenship.optDocument': visaDocument._id },
            { new: true }
          );
        } else if (documentType === 'driverLicense') {
          // Handle Driver's License
          await Employee.findOneAndUpdate(
            { userId: userid },
            {
              'driverLicense.licenseCopy': newFileName,
            },
            { new: true }
          );
        } else {
          return res.status(400).json({ error: 'Invalid document type.' });
        }
    
        res.status(201).json({ documentId: newFileName });
      } catch (e) {
        console.error('Error creating visa document:', e);
        res.status(500).json({ error: 'An error occurred while creating the document' });
      }
}

const getEmployeeVisaDoc = async(req, res) => {
    // const { userid } = req.body;  // for testing without middleware
    const userid = req.user.id;
    try {
        const employee = await Employee.findOne({ userId: userid });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (!employee.optDocument) {
            return res.status(200).json({ message: 'No opt document uploaded yet' });
        }
        
        const visaDocument = await VisaDocuments.findById(employee.optDocument);
        if (!visaDocument) {
            return res.status(404).json({ message: 'Visa document not found' });
        }
        res.status(200).json(visaDocument)
    } catch(e) {
        console.error('Error retrieving visa document:', e);
        res.status(500).json({ error: 'An error occurred while retrieving the visa document' });
    }
}


const putEmployeeVisaDocName = async(req, res) => {
    // const { userid, username, documentType } = req.body;  // for testing without middleware
    
    const userid = req.user.id;
    const username= req.user.username;
    const { documentType } = req.body; // e.g., 'optReceipt', 'optEAD', 'i983', 'i20'
    const file = req.file; // Assuming file is uploaded via multer and available in req.file

    if (!documentType) {
        return res.status(400).json({ error: 'Document type is required.' });
    }
    if (!file) {
        return res.status(400).json({ error: 'File is required.' });
    }
    try {
        // Extract the file extension
        const fileExtension = path.extname(file.originalname);

        // Generate the new file name with extension
        const newFileName = `${username}-${documentType}${fileExtension}`;

        // Upload file to S3
        await uploadFileToS3(file.path, newFileName, file.mimetype);

        // Update the corresponding document type in MongoDB
        const update = {};
        update[`${documentType}.name`] = newFileName;

        const updatedDocument = await VisaDocuments.findOneAndUpdate(
            { userid },
            { $set: update },
            { new: true, upsert: false }
        );

        if (!updatedDocument) {
            return res.status(404).json({ error: 'User document not found' });
        }

        // Remove file from local after upload (optional)
        fs.unlinkSync(file.path);

        // Return updated document
        res.status(200).json(updatedDocument);
    } catch (e) {
        console.error('Error uploading document:', e);
        res.status(500).json({ error: 'An error occurred while uploading the document.' });
    }
}

const getEmployeeUploadedDocumentUrls = async (req, res) => {
    // const { userid } = req.body;  // for testing without middleware
    
    const userid = req.user.id;
    try {
        // Find the document by user ID
        const visaDocument = await VisaDocuments.findOne({ userid });
        
        if (!visaDocument) {
            return res.status(404).json({ error: 'Visa document not found' });
        }

        // Initialize an array to hold the URLs and MIME types
        const documentUrls = [];

        // Iterate through the possible document fields and find all with non-empty names
        for (const key of ['optReceipt', 'optEAD', 'i983', 'i20']) {
            const document = visaDocument[key];
            if (document && document.name) {
                // Get the temporary URL from S3
                const { url, mimeType } = await getTemporaryUrlFromS3(document.name);
                documentUrls.push({ documentType: key, url, mimeType });
            }
        }

        if (documentUrls.length === 0) {
            return res.status(404).json({ error: 'No uploaded documents found' });
        }

        // Return the list of document URLs and their MIME types
        res.status(200).json(documentUrls);
    } catch (e) {
        console.error('Error fetching uploaded document URLs:', e);
        res.status(500).json({ error: 'An error occurred while fetching the uploaded document URLs' });
    }
};

module.exports = {
    getEmployeeVisaDoc,
    postEmployeeVisaDoc,
    putEmployeeVisaDocName,
    getEmployeeUploadedDocumentUrls
}