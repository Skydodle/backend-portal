/** @format */

const User = require('../models/User');
const Product = require('../models/Product');

// GET: fetch user's favorites with product details
const getUserFavorites = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favoriteProductIds = user.favorites;
    const favoriteProducts = await Product.find({
      _id: { $in: favoriteProductIds },
    });

    res.status(200).json({ favorites: favoriteProducts });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

// PUT: Add a new product to user's favorites
const putAddFavorite = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    if (!productId || !id) {
      return res
        .status(400)
        .json({ message: 'User and product ID are required' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(productId)) {
      console.log('Favorite already exists:', user);
      return res.status(409).json({
        message: 'Favorite already exists',
        favorites: user.favorites,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    user.favorites.push(productId);
    await user.save();

    console.log('Favorite added:', user);

    res.status(201).json({
      message: 'Favorite added successfully',
      favorites: user.favorites,
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// DELETE: Remove a product from user's favorites
const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    if (!productId || !id) {
      return res
        .status(400)
        .json({ message: 'User and product ID are required' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const index = user.favorites.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    user.favorites.splice(index, 1);
    await user.save();

    console.log('Favorite removed:', user);

    res.status(200).json({
      message: 'Favorite removed successfully',
      favorites: user.favorites,
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = { getUserFavorites, putAddFavorite, deleteFavorite };
