const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const User = require('../models/User');

/**
 * Controller method to handle employee/HR login.
 * This function will:
 * 1. Validate the username and password provided by the user.
 * 2. Check the user's role in the database.
 * 3. Generate a JWT token that includes the user's ID, username, and role.
 * 4. Return the token to the client for use in authentication.
 */

const postLoginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify the password using argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role, // 'employee' or 'HR'
        email: user.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
    );

    // Return the token to the client
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login', error });
  }
};

module.exports = {
  postLoginUser,
};
