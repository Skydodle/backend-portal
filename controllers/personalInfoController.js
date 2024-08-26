const Employee = require("../models/Employee");
const User = require("../models/User");
const VisaDocuments = require("../models/VisaDocuments");
const fs = require('fs');
const { uploadFileToS3 } = require("../utils/s3Utils");
const path = require("path");


const getEmployeeInfoById = async(req, res) => {
    const userId = req.user.id;
    try {
        const employee = await Employee.findOne({ userId })
                        .populate({path: 'userId', select: 'email'})
                        .populate({ path: 'citizenship.optDocument' });
        if (!employee) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(employee);
    } catch (e) {
        console.error('Error feteching user', e);
        res.status(500).json({ error: 'An error occurred while fetching user.' });
    }
}

const putEmployeeInfoById = async(req, res) => {
    const userId = req.user.id;
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            {userId},
            {$set: req.body},
            {new: true}
        )
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'User not found' })
        }
        await updatedEmployee.populate('userId', 'email');
        res.status(200).json(updatedEmployee)
    } catch (e) {
        console.error('Error updating employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const putEmployeeEmailById = async(req, res) => {
    const userId = req.user.id;
    const { email } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId, { email }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (e) {
        console.error('Error updating email:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateProfilePicture = async (req, res) => {
    const userId = req.user.id;  
    const file = req.file;
    const username= req.user.username;

    if (!file) {
        return res.status(400).json({ error: 'File is required.' });
    }

    try {
        const employee = await Employee.findOne({ userId }).select('profilePicture');

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const newFileName = `profilePicture-${username}${path.extname(file.originalname)}` || employee.profilePicture;
        await uploadFileToS3(file.path, newFileName, file.mimetype);

        const updatedEmployee = await Employee.findOneAndUpdate(
            { userId },
            { $set: { profilePicture: newFileName } },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        fs.unlinkSync(file.path);
        res.status(200).json(updatedEmployee)
        
    } catch (e) {
        console.error('Error updating profile picture:', e.message);
        res.status(500).json({ error: 'An error occurred while updating the profile picture.' });
    }
}

const updateLicenseCopy = async (req, res) => {
    const userId = req.user.id;
    const file = req.file;
    const username= req.user.username;

    if (!file) {
        return res.status(400).json({ error: 'File is required.' });
    }

    try {
        const employee = await Employee.findOne({ userId }).select('driverLicense.licenseCopy');
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const newFileName = `licenseCopy-${username}${path.extname(file.originalname)}` || employee.driverLicense.licenseCopy;

        await uploadFileToS3(file.path, newFileName, file.mimetype);

        const updatedEmployee = await Employee.findOneAndUpdate(
            { userId },
            { $set: { 'driverLicense.licenseCopy': newFileName } },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        fs.unlinkSync(file.path);
        res.status(200).json(updatedEmployee);
    } catch (e) {
        console.error('Error updating license copy:', e.message);
        res.status(500).json({ error: 'An error occurred while updating the license copy.' });
    }
};

const updateVisaDocument = async(req, res) => {
    const userId = req.user.id;
    const file = req.file;
    const username= req.user.username;
    const { documentType } = req.body; // e.g., 'optReceipt', 'optEAD', 'i983', 'i20'
    if (!documentType) {
        return res.status(400).json({ error: 'Document type is required.' });
    }
    if (!file) {
        return res.status(400).json({ error: 'File is required.' });
    }
    try {
        const document = await VisaDocuments.findOne({userid: userId}).select(documentType)
        if (!document) {
            return res.status(404).json({error:'user not found in visa Documents'})
        }
        const existingFileName = `${documentType}-${username}${path.extname(file.originalname)}` || document[documentType].name;

        await uploadFileToS3(file.path, existingFileName, file.mimetype);

        const update = {};
        update[`${documentType}.name`] = existingFileName;

        const updatedDocument = await VisaDocuments.findOneAndUpdate(
            { userid: userId },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ error: 'User document not found' });
        }

        fs.unlinkSync(file.path);
        res.status(200).json(updatedDocument);
    } catch (e) {
        console.error('Error updating visa document:', e.message);
        res.status(500).json({ error: 'An error occurred while updating the visa document.' });
    }
}

module.exports = {
    getEmployeeInfoById,
    putEmployeeInfoById,
    putEmployeeEmailById,
    updateProfilePicture,
    updateLicenseCopy,
    updateVisaDocument,
}