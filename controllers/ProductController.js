/** @format */

const Product = require('../models/Product');

// GET All Products
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// GET product by ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product detail' }, error);
  }
};

const getProductsByFilter = async (req, res) => {
  try {
    const { brands, types, page = 1, limit = 9 } = req.query;

    const query = {};

    // Add brand filter to the query if provided
    if (brands) {
      query.brand = { $in: brands.split(',') };
    }

    // Add type filter to the query if provided
    if (types) {
      query.type = { $in: types.split(',') };
    }

    console.log('Query:', query); // Debugging line

    const skip = (page - 1) * limit;

    const filteredProducts = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    if (!filteredProducts.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products: filteredProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.query;

    if (!brand) {
      return res.status(400).json({ message: 'Brand is required' });
    }

    const products = await Product.find({ brand });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found for this brand' });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByFilter,
  getProductsByBrand,
};
