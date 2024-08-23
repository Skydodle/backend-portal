/** @format */

const { Router } = require('express');
const {
  validateNewUser,
  validateLoginUser,
} = require('../middlewares/UserMiddleware');
const {
  postRegisterUser,
  validateRegistrationToken,
} = require('../controllers/authController');
const {
  postLoginUser,
  postLoginHR,
} = require('../controllers/loginController');

const authRouter = Router();

// Route to handle employee/HR registration
authRouter.post('/register', validateNewUser, postRegisterUser);

// Route to handle employee/HR login to React app
authRouter.post('/login', validateLoginUser, postLoginUser);

// Route to handle only HR login to Angular app
authRouter.post('/HRlogin', validateLoginUser, postLoginHR);

// Route to validate registration token before displaying the registration form
authRouter.get('/validate-token', validateRegistrationToken);

module.exports = authRouter;
