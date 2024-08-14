/** @format */

const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  getProductsByFilter,
  getProductsByBrand,
} = require('../controllers/ProductController');

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/details/:productId', getProductById);
productRouter.get('/filter', getProductsByFilter);
productRouter.get('/brand', getProductsByBrand);

module.exports = productRouter;
