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

employeeRouter.get('/status', validateJWT, getOnboardingStatus);
employeeRouter.get('/profile', validateJWT, getUserProfile);
employeeRouter.post('/profile', validateJWT, postUserProfile);

employeeRouter.get(
  '/employees',
  validateHRJWT,
  hrAuthMiddleware,
  getAllEmployees,
);
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
