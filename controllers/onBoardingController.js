const Employee = require('../models/Employee');

// Get onboarding status
const getOnboardingStatus = async (req, res) => {
  try {
    const userId = req.user.id; 
    const employee = await Employee.findOne({ userId });
    // If no profile is found, default to 'Not Started' status
    if (!employee) {
      return res.status(200).json({
        onboardingStatus: 'Not Started',
        feedback: '',
      });
    }

    // If the profile exists, return the actual onboardingStatus and feedback
    return res.status(200).json({
      onboardingStatus: employee.onboardingStatus,
      feedback: employee.feedback,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Employee.findOne({ userId }).select('-password');

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
    console.log("User ID from JWT:", userId); 

    // Find the Employee document associated with the user
    let user = await Employee.findOne({ userId });

    // If Employee document doesn't exist, create a new one
    if (!user) {
      user = new Employee({ userId });
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

    // Save the new or updated profile
    await user.save();

    return res.status(200).json({ message: 'Onboarding information submitted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ firstName: 1 }); // Sort by first name

    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: 'Server error!', error });
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
  getAllEmployees,
  approveApplication,
  rejectApplication,
};
