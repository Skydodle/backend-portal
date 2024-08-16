/** @format */

const { Router } = require('express');
const { validateNewUser } = require('../middlewares/UserMiddleware');
const { postRegisterEmployee } = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/register', validateNewUser, postRegisterEmployee);

module.exports = authRouter;
