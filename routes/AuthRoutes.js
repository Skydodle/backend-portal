/** @format */

const { Router } = require('express');
const {
  validateNewUser,
  validateLoginUser,
} = require('../middlewares/UserMiddleware');
const { postRegisterEmployee } = require('../controllers/authController');
const { postLoginEmployee } = require('../controllers/loginController');

const authRouter = Router();

// Route to handle employee/HR registration
authRouter.post('/register', validateNewUser, postRegisterEmployee);

// Route to handle employee/HR login
authRouter.post('/login', validateLoginUser, postLoginEmployee);

module.exports = authRouter;
