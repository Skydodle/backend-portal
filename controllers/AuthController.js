/** @format */

const argon2 = require('argon2');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register New User
const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.id, username, 'user');

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json(error);
  }
};

// Login User
const postLoginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: 'Username & password are required' });
    }

    // check if indentifier input is username or email
    const isEmail = identifier.includes('@');
    const user = isEmail
      ? await User.findOne({ email: identifier }).select('+password')
      : await User.findOne({ username: identifier }).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'Invalid username/email' });
    }

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user.id, user.username, 'user');
    console.log(token);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postRegisterUser,
  postLoginUser,
};
