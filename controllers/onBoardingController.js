const Employee = require('../models/Employee');

// Get onboarding status
const getOnboardingStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Employee.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      onboardingStatus: user.onboardingStatus,
      feedback: user.feedback,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Employee.findById(userId).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Post (Submit) user profile
const postUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Employee.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      firstName,
      lastName,
      middleName,
      preferredName,
      address,
      cellPhoneNumber,
      workPhoneNumber,
      car,
      ssn,
      dateOfBirth,
      gender,
      citizenship,
      driverLicense,
      emergencyContacts,
    } = req.body;

    // Update user information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.middleName = middleName || user.middleName;
    user.preferredName = preferredName || user.preferredName;
    user.address = address || user.address;
    user.cellPhoneNumber = cellPhoneNumber || user.cellPhoneNumber;
    user.workPhoneNumber = workPhoneNumber || user.workPhoneNumber;
    user.car = car || user.car;
    user.ssn = ssn || user.ssn;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.citizenship = citizenship || user.citizenship;
    user.driverLicense = driverLicense || user.driverLicense;
    user.emergencyContacts = emergencyContacts || user.emergencyContacts;

    // Update onboarding status to Pending if it was Not Started or Rejected
    if (user.onboardingStatus === 'Not Started' || user.onboardingStatus === 'Rejected') {
      user.onboardingStatus = 'Pending';
      user.feedback = '';  // Clear feedback on resubmission
    }

    await user.save();

    return res.status(200).json({ message: 'Onboarding information submitted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Put (Update) user profile
const putUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Employee.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      firstName,
      lastName,
      middleName,
      preferredName,
      address,
      cellPhoneNumber,
      workPhoneNumber,
      car,
      dateOfBirth,
      gender,
      citizenship,
      driverLicense,
      emergencyContacts,
    } = req.body;

    // Update user information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.middleName = middleName || user.middleName;
    user.preferredName = preferredName || user.preferredName;
    user.address = address || user.address;
    user.cellPhoneNumber = cellPhoneNumber || user.cellPhoneNumber;
    user.workPhoneNumber = workPhoneNumber || user.workPhoneNumber;
    user.car = car || user.car;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.citizenship = citizenship || user.citizenship;
    user.driverLicense = driverLicense || user.driverLicense;
    user.emergencyContacts = emergencyContacts || user.emergencyContacts;

    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
const getApplicationsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const applications = await Employee.find({ onboardingStatus: status });

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// View a specific onboarding application
const viewApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Employee.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Approve an onboarding application
const approveApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Employee.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.onboardingStatus = 'Approved';
    await application.save();

    return res.status(200).json({ message: 'Application approved successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Reject an onboarding application and provide feedback
const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    const application = await Employee.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.onboardingStatus = 'Rejected';
    application.feedback = feedback;
    await application.save();

    return res.status(200).json({ message: 'Application rejected with feedback' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
module.exports = {
  getOnboardingStatus,
  getUserProfile,
  postUserProfile,
  putUserProfile,
  getApplicationsByStatus,
  viewApplication,
  approveApplication,
  rejectApplication,
};
