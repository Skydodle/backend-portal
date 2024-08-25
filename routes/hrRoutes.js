/** @format */

const { Router } = require('express');
const {
  sendRegistrationEmailToEmployee,
  getRegistrationHistory,
} = require('../controllers/hrController');
const { getAllEmployeesHR, getEmployeeByIdHR } = require('../controllers/hrEmployeeProfileController');

const hrRouter = Router();

hrRouter.post('/send-email', sendRegistrationEmailToEmployee);
hrRouter.get('/registration-history', getRegistrationHistory);

// for michael's code
hrRouter.get('/all-employees', getAllEmployeesHR)
hrRouter.get('/employee/:id', getEmployeeByIdHR)

module.exports = hrRouter;
