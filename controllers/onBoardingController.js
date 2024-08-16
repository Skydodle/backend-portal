const Employee = require('../models/Employee');

// Get onboarding page based on user's onboarding status
const getOnboardingPage = async (req, res) => {
  const userId = req.user.id;
  const user = await Employee.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  switch (user.onboardingStatus) {
    case 'Not Started':
      return res.render('onboarding/notStarted', { user });

    case 'Rejected':
      // Provide feedback on why the application was rejected
      return res.render('onboarding/rejected', { user, feedback: user.feedback });

    case 'Pending':
      return res.render('onboarding/pending', { user });

    case 'Approved':
      return res.redirect('/home');

    default:
      return res.status(500).json({ message: 'Invalid onboarding status' });
  }
};


module.exports = {
  getOnboardingPage,
};
