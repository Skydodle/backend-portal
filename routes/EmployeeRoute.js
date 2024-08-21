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
const {
  validateJWT,
  hrAuthMiddleware,
} = require('../middlewares/AuthMiddleware');

employeeRouter.get('/status', validateJWT, getOnboardingStatus);
employeeRouter.get('/profile', validateJWT, getUserProfile);
employeeRouter.post('/profile', validateJWT, postUserProfile);

employeeRouter.get(
  '/employees',
  validateJWT,
  hrAuthMiddleware,
  getAllEmployees,
);
employeeRouter.put(
  '/applications/approve/:id',
  validateJWT,
  hrAuthMiddleware,
  approveApplication,
);
employeeRouter.put(
  '/applications/reject/:id',
  validateJWT,
  hrAuthMiddleware,
  rejectApplication,
);

module.exports = employeeRouter;
