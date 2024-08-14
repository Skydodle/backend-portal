const argon2 = require('argon2');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Product = require('../models/Product');
const generateToken = require('../utils/generateToken');

// Login Admin
const postLoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(404).json({ message: 'Invalid email' });
    }

    const isPasswordCorrect = await argon2.verify(admin.password, password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(admin.id, admin.email, 'admin');
    console.log(token);

    res.status(200).json({ admin, token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET: get all user data along with user's favorites list
const getAllUsersWithFavorites = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await User.find().populate('favorites');
    const usersWithFavorites = await Promise.all(
      users.map(async (user) => {
        const favoriteProductIds = user.favorites;
        const favoriteProducts = await Product.find({
          _id: { $in: favoriteProductIds },
        });
        return {
          ...user.toObject(),
          favorites: favoriteProducts,
        };
      }),
    );

    res.status(200).json(usersWithFavorites);
  } catch (error) {
    console.error('Error fetching users with favorites:', error);
    res
      .status(500)
      .json({ message: 'Error fetching users with favorites', error });
  }
};

module.exports = { postLoginAdmin, getAllUsersWithFavorites };
