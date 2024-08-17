const express = require('express');
const employeeRouter = express.Router();
const { getOnboardingStatus, getUserProfile, postUserProfile, putUserProfile, getApplicationsByStatus, viewApplication, approveApplication, rejectApplication } = require('../controllers/onboardingController');
const {validateJWT,hrAuthMiddleware} = require('../middlewares/authMiddleware');

employeeRouter.get('/status', validateJWT, getOnboardingStatus);
employeeRouter.get('/profile', validateJWT, getUserProfile);
employeeRouter.post('/profile', validateJWT, postUserProfile);
employeeRouter.put('/profile', validateJWT, putUserProfile);

employeeRouter.get('/applications/:status', validateJWT, hrAuthMiddleware, getApplicationsByStatus);
employeeRouter.get('/applications/view/:id', validateJWT, hrAuthMiddleware, viewApplication);
employeeRouter.put('/applications/approve/:id', validateJWT, hrAuthMiddleware, approveApplication);
employeeRouter.put('/applications/reject/:id', validateJWT, hrAuthMiddleware, rejectApplication);




module.exports = employeeRouter;
