/** @format */

const { Router } = require('express');
const validateJWT = require('../middlewares/AuthMiddleware');
const {
  postLoginAdmin,
  getAllUsersWithFavorites,
} = require('../controllers/AdminController');

const adminRouter = Router();

adminRouter.post('/login', postLoginAdmin);
adminRouter.get('/get', validateJWT, getAllUsersWithFavorites);

module.exports = adminRouter;
