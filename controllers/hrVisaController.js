const VisaDocuments = require('../models/VisaDocuments');
const { getTemporaryUrlFromS3 } = require('../utils/s3Utils');
const Employee = require('../models/Employee');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const putEmployeeVisaApprove = async (req, res) => {
  const { userid, documentType } = req.body;

  if (!userid) {
    return res.status(400).json({ error: 'userid is required' });
  }
  if (!documentType) {
    return res.status(400).json({ error: 'documentType is required(hr side)' });
  }
  try {
    const update = {
      [`${documentType}.status`]: 'approved',
      [`${documentType}.feedback`]: '',
    };
    const updateVisaDoc = await VisaDocuments.findOneAndUpdate(
      { userid },
      { $set: update },
      { new: true, upsert: false },
    );

    if (!updateVisaDoc) {
      return res.status(404).json({ error: 'Visa document or user not found' });
    }

    // Retrieve the employee's email and name
    const employee = await Employee.findOne({ userId: userid }).populate(
      'userId',
      'email',
    );
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    console.log('Sending email to:', employee.userId.email);

    // Prepare the email based on documentType
    let emailSubject = '';
    let emailText = '';

    if (documentType === 'optReceipt') {
      emailSubject = 'Next Step: Upload Your OPT EAD Document';
      emailText = `Hi ${employee.firstName},\n\nYour OPT Receipt has been approved. Please upload your OPT EAD document to proceed with your onboarding process.\n\nThank you.`;
    } else if (documentType === 'optEAD') {
      emailSubject = 'Next Step: Download and Upload Your i-983 Form';
      emailText = `Hi ${employee.firstName},\n\nYour OPT EAD has been approved. Please download, fill out, and upload your i-983 Form to complete your onboarding process.\n\nThank you.`;
    } else if (documentType === 'i983') {
      emailSubject = 'OPT Onboarding Process Completed';
      emailText = `Hi ${employee.firstName},\n\nYour i-983 Form has been approved. Your OPT onboarding process is now complete.\n\nThank you for your cooperation.`;
    }

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employee.userId.email,
      subject: emailSubject,
      text: emailText,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');

    res.status(200).json(updateVisaDoc);
  } catch (e) {
    console.error('Error for approving visa document and sending email', e);
    res.status(500).json({
      error:
        'An error occurred while approving the document and sending the email',
    });
  }
};

const putEmployeeVisaReject = async (req, res) => {
  const { userid, documentType, feedback } = req.body;
  if (!userid) {
    return res.status(400).json({ error: 'userid is required' });
  }
  if (!documentType) {
    return res.status(400).json({ error: 'documentType is required(hr side)' });
  }
  if (!feedback) {
    return res.status(400).json({ error: 'feedback is required' });
  }

  try {
    const update = {
      [`${documentType}.status`]: 'rejected',
      [`${documentType}.feedback`]: feedback,
    };
    const updateVisaDoc = await VisaDocuments.findOneAndUpdate(
      { userid },
      { $set: update },
      { new: true, upsert: false },
    );
    if (!updateVisaDoc) {
      return res.status(404).json({ error: 'Visa document or user not found' });
    }
    res.status(200).json(updateVisaDoc);
  } catch (e) {
    console.error('Error for rejecting visa doc');
    res.status(500).json({ error: 'An error occured while rejecting the doc' });
  }
};

const getEmployeeVisaPreview = async (req, res) => {
  const { userid } = req.body;
  try {
    const visaDocument = await VisaDocuments.findOne({ userid });
    if (!visaDocument) {
      return res.status(404).json({ error: 'Visa document not found(hr)' });
    }

    const documentUrls = [];
    for (const key of ['optReceipt', 'optEAD', 'i983', 'i20']) {
      const document = visaDocument[key];
      if (document && document.name) {
        // Get the temporary URL from S3
        const { url, mimeType } = await getTemporaryUrlFromS3(document.name);
        documentUrls.push({ documentType: key, url, mimeType });
      }
    }
    if (documentUrls.length === 0) {
      return res.status(404).json({ error: 'No document were uploaded' });
    }
    res.status(200).json(documentUrls);
  } catch (e) {
    console.error('Error fetching uploaded document URLs: ', e);
    res.status(500).json({
      error: 'An error occurred while fetching the uploaded document URLs',
    });
  }
};

const getF1EmployeeVisaStatus = async (req, res) => {
  try {
    const f1Employee = await Employee.find({
      'citizenship.optDocument': { $ne: null },
    })
      .populate('citizenship.optDocument')
      .exec();
    if (!f1Employee) {
      return res.status(404).json({ error: 'No F1 visa employee' });
    }
    res.status(200).json(f1Employee);
  } catch (e) {
    console.error('Error fetching employee', e);
    throw e;
  }
};

module.exports = {
  putEmployeeVisaApprove,
  putEmployeeVisaReject,
  getEmployeeVisaPreview,
  getF1EmployeeVisaStatus,
};
