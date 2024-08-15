/** @format */

const { Router } = require('express');
const {
  sendRegistrationEmailToEmployee,
  getRegistrationHistory,
} = require('../controllers/hrController');

const hrRouter = Router();

hrRouter.post('/register', sendRegistrationEmailToEmployee);
hrRouter.get('/registration-history', getRegistrationHistory);

module.exports = hrRouter;
