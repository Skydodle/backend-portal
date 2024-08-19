const VisaDocuments = require('../models/VisaDocuments');
const { getTemporaryUrlFromS3 } = require('../utils/s3Utils');



const putEmployeeVisaApprove = async(req, res) => {
    const { userid, documentType } = req.body
    
    if (!userid) {
        return res.status(400).json({error: 'userid is required'})
    }
    if (!documentType) {
        return res.status(400).json({error: 'documentType is required(hr side)'})
    }
    try {      

        const update = { [`${documentType}.status`]: 'approved',
                         [`${documentType}.feedback`]: '' };
        const updateVisaDoc = await VisaDocuments.findOneAndUpdate(
            { userid },
            { $set: update },
            { new: true, upsert: false }
        )

        if (!updateVisaDoc) {
            return res.status(404).json({ error: 'Visa document or user not found' });
        }
        res.status(200).json(updateVisaDoc)
    } catch (e) {
        console.error('Error for approving visa doc')
        res.status(500).json({error: 'An error occurred while uploading the doc'})
    }
}

const putEmployeeVisaReject = async(req, res) => {
    const { userid, documentType, feedback} = req.body
    if (!userid) {
        return res.status(400).json({error: 'userid is required'})
    }
    if (!documentType) {
        return res.status(400).json({error: 'documentType is required(hr side)'})
    }
    if (!feedback) {
        return res.status(400).json({error: 'feedback is required'})
    }

    try {
        const update = {
            [`${documentType}.status`]: 'rejected', 
            [`${documentType}.feedback`]: feedback 
        }
        const updateVisaDoc = await VisaDocuments.findOneAndUpdate(
            { userid },
            { $set: update },
            { new: true, upsert: false }
        )
        if (!updateVisaDoc) {
            return res.status(404).json({error: 'Visa document or user not found'})
        }
        res.status(200).json(updateVisaDoc)
    } catch (e) {
        console.error('Error for rejecting visa doc')
        res.status(500).json({error: 'An error occured while rejecting the doc'})
    }    
}

const getEmployeeVisaPreview = async(req, res) => {
    const { userid } = req.body
    try {
        const visaDocument = await VisaDocuments.findOne({ userid })
        if (!visaDocument) {
            return res.status(404).json({ error: 'Visa document not found(hr)'})
        }

        const documentUrls = []
        for (const key of ['optReceipt', 'optEAD', 'i983', 'i20']) {
            const document = visaDocument[key];
            if (document && document.name) {
                // Get the temporary URL from S3
                const { url, mimeType } = await getTemporaryUrlFromS3(document.name);
                documentUrls.push({ documentType: key, url, mimeType });
            }
        }
        if (documentUrls.length === 0) {
            return res.status(404).json({ error: 'No document were uploaded'})
        }
        res.status(200).json(documentUrls)
    } catch (e) {
        console.error('Error fetching uploaded document URLs: ', e)
        res.status(500).json({ error: 'An error occurred while fetching the uploaded document URLs' })
    }
}

module.exports = {
    putEmployeeVisaApprove,
    putEmployeeVisaReject,
    getEmployeeVisaPreview
}