const nodemailer = require('nodemailer');
const crypto = require('crypto');
const RegistrationToken = require('../models/RegistrationToken');

// Generate a registration token
const generateToken = async (email, name) => {
  const token = crypto.randomBytes(20).toString('hex');
  const expirationDate = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now

  const registrationToken = new RegistrationToken({
    token,
    email,
    name,
    expirationDate,
  });

  await registrationToken.save();
  return token;
};

// Set up the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or another email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Send registration email
const sendRegistrationEmail = async (name, email, token) => {
  const registrationLink = `http://yourdomain.com/register?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Complete Your Registration',
    text: `Hi ${name},\n\nPlease complete your registration by clicking on the link below:\n${registrationLink}\n\nThank you.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Failed to send registration email:', error);
  }
};

// Controller method to generate and send the registration email
const sendRegistrationEmailToEmployee = async (req, res) => {
  const { email, name } = req.body;

  try {
    const token = await generateToken(email, name);
    await sendRegistrationEmail(name, email, token);
    res.status(200).json({ message: 'Registration email sent successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to send registration email to employee',
      error,
    });
  }
};

// Method to get the history of registration tokens
const getRegistrationHistory = async (req, res) => {
  try {
    const history = await RegistrationToken.find({});
    res.status(200).json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve registration history', error });
  }
};

module.exports = {
  sendRegistrationEmailToEmployee,
  getRegistrationHistory,
};
