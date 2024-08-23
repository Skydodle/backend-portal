const { json } = require('express');
const { extname } = require('path');
const path = require('path');
const Employee = require('../models/Employee');
const { uploadFileToS3 } = require('../utils/s3Utils');

const updatePersonalDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID from JWT:', userId);

    // Find the Employee document associated with the user
    const user = await Employee.findOne({ userId });

    // If Employee document doesn't exist, create a new one
    if (!user) {
      throw new Error('User does not exist');
    }
    const {
      firstName,
      lastName,
      middleName,
      preferredName,
      ssn,
      dateOfBirth,
      gender,
    } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName = middleName;
    user.preferredName = preferredName;
    user.ssn = ssn;
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;

    // Save the new or updated profile
    await user.save();
    return res
      .status(200)
      .json({ message: 'Employee Personal Details updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const updateProfileImage = async (req, res) => {
  const userid = req.user.id;
  const username = req.user.username;

  const file = req.file; // Assuming file is uploaded via multer and available in req.file

  if (!file) {
    return res.status(400).json({ error: 'File is required.' });
  }
  try {
    // Extract the file extension
    const fileExtension = path.extname(file.originalname);

    // Generate the new file name with extension
    const newFileName = `${username}-profileImage-${fileExtension}`;

    // Upload file to S3
    await uploadFileToS3(file.path, newFileName, file.mimetype);

    // Update the corresponding document type in MongoDB
    const update = {};
    update[`profilePicture`] = newFileName;

    const updatedDocument = await Employee.findOneAndUpdate(
      { userid },
      { $set: update },
      { new: true, upsert: false },
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
    res
      .status(500)
      .json({ error: 'An error occurred while uploading the document.' });
  }
};

const updateCarInformation = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID from JWT:', userId);

    // Find the Employee document associated with the user
    const user = await Employee.findOne({ userId });

    // If Employee document doesn't exist, create a new one
    if (!user) {
      throw new Error('User does not exist');
    }
    const { make, model, color } = req.body;

    user.car.make = make;
    user.car.model = model;
    user.car.color = color;

    // Save the new or updated profile
    await user.save();
    return res
      .status(200)
      .json({ message: 'Employee car information updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const updateContactInformation = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID from JWT:', userId);

    // Find the Employee document associated with the user
    const user = await Employee.findOne({ userId });

    // If Employee document doesn't exist, create a new one
    if (!user) {
      throw new Error('User does not exist');
    }
    const { email, cellPhoneNumber, workPhoneNumber } = req.body;

    user.email = email;
    user.cellPhoneNumber = cellPhoneNumber;
    user.workPhoneNumber = workPhoneNumber;

    // Save the new or updated profile
    await user.save();
    return res
      .status(200)
      .json({ message: 'Employee Contact Information updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID from JWT:', userId);

    // Find the Employee document associated with the user
    const user = await Employee.findOne({ userId });
    // If Employee document doesn't exist, create a new one
    if (!user) {
      throw new Error('User does not exist');
    }

    const { street, city, state, zip } = req.body;
    user.address.street = street;
    user.address.city = city;
    user.address.state = state;
    user.address.zip = zip;
    // Save the new or updated profile
    await user.save();

    return res
      .status(200)
      .json({ message: 'Employee Address Information updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
module.exports = {
  updateAddress,
  updateCarInformation,
  updateContactInformation,
  updatePersonalDetails,
  updateProfileImage,
};
