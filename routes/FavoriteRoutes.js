/** @format */

const { Router } = require('express');
const validateJWT = require('../middlewares/AuthMiddleware');
const {
  getUserFavorites,
  putAddFavorite,
  deleteFavorite,
} = require('../controllers/FavoriteController');

const favoriteRouter = Router();

favoriteRouter.get('/get', validateJWT, getUserFavorites);
favoriteRouter.put('/add', validateJWT, putAddFavorite);
favoriteRouter.delete('/delete', validateJWT, deleteFavorite);

module.exports = favoriteRouter;
