const argon2 = require('argon2');
const Employee = require('../models/Employee');
const RegistrationToken = require('../models/RegistrationToken');

// Controller method to complete employee registration
const postRegisterEmployee = async (req, res) => {
  const { token, username, password, email } = req.body;

  try {
    // Verify the token
    const registrationToken = await RegistrationToken.findOne({ token });

    if (!registrationToken) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired registration token' });
    }

    if (registrationToken.isExpired()) {
      return res
        .status(400)
        .json({ message: 'Registration token has expired' });
    }

    // Check if the input email matches the email associated with the token
    if (email !== registrationToken.email) {
      return res.status(400).json({
        message:
          'Email does not match the one associated with the registration token',
      });
    }

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Create the new employee
    const newEmployee = await Employee.create({
      username,
      password: hashedPassword,
      email: registrationToken.email, // Use the email associated with the token
    });

    // Update the token status to indicate it has been used
    registrationToken.status = 'Registered';
    await registrationToken.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register employee', error });
  }
};

module.exports = {
  postRegisterEmployee,
};