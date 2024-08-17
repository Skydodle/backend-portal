/** @format */

const { Router } = require('express');
const {
  sendRegistrationEmailToEmployee,
  getRegistrationHistory,
} = require('../controllers/hrController');

const hrRouter = Router();

hrRouter.post('/send-email', sendRegistrationEmailToEmployee);
hrRouter.get('/registration-history', getRegistrationHistory);

module.exports = hrRouter;
