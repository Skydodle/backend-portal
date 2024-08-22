const express = require('express');
const employeeRouter = express.Router();
const {
  getOnboardingStatus,
  getUserProfile,
  postUserProfile,
  getAllEmployees,
  approveApplication,
  rejectApplication,
} = require('../controllers/onboardingController');
const { validateHRJWT } = require('../middlewares/AuthMiddleware');

employeeRouter.get('/status', validateHRJWT, getOnboardingStatus);
employeeRouter.get('/profile', validateHRJWT, getUserProfile);
employeeRouter.post('/profile', validateHRJWT, postUserProfile);

employeeRouter.get('/employees', validateHRJWT, getAllEmployees);
employeeRouter.put(
  '/applications/approve/:id',
  validateHRJWT,
  approveApplication,
);
employeeRouter.put(
  '/applications/reject/:id',
  validateHRJWT,
  rejectApplication,
);

module.exports = employeeRouter;
