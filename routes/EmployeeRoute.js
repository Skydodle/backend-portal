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
const { validateJWT, validateHRJWT } = require('../middlewares/AuthMiddleware');
const {
  updateAddress,
  updateCarInformation,
  updateContactInformation,
  updatePersonalDetails,
  updateProfileImage,
} = require('../controllers/employeeProfileController');
const { getEmployeeInfoById, putEmployeeEmailById, putEmployeeInfoById, updateLicenseCopy, updateProfilePicture, updateVisaDocument } = require('../controllers/personalInfoController');
const multer = require('multer');
const upload = multer({dest: 'upload/'})

employeeRouter.get('/status', validateJWT, getOnboardingStatus);
employeeRouter.get('/profile', validateJWT, getUserProfile);
employeeRouter.post('/profile', validateJWT, postUserProfile);

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
employeeRouter.put('/profile/address', updateAddress);
employeeRouter.put('/profile/car', updateCarInformation);
employeeRouter.put('/profile/contact', updateContactInformation);
employeeRouter.put('/profile/personal', updatePersonalDetails);
employeeRouter.put('/profile/avatar', updateProfileImage);

employeeRouter.get('/info', validateJWT, getEmployeeInfoById)
employeeRouter.put('/info', validateJWT, putEmployeeInfoById)
employeeRouter.put('/info/email', validateJWT, putEmployeeEmailById)
employeeRouter.put('/info/profile', validateJWT, upload.single('file'), updateProfilePicture)
employeeRouter.put('/info/visa', validateJWT, upload.single('file'), updateVisaDocument)
employeeRouter.put('/info/license', validateJWT, upload.single('file'), updateLicenseCopy)

module.exports = employeeRouter;
