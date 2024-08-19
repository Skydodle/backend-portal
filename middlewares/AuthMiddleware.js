const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
/**
 * Middleware to validate JWT.
 * This middleware will:
 * 1. Extract the token from the request (Header OR Cookie).
 * 2. Verify the token's validity.
 * 3. Validate the user's role (must be 'employee' or 'HR').
 * 4. Assign decoded token data to the request.
 * 5. Pass control to the next middleware function.
 */

const validateJWT = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || validator.isEmpty(token)) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded.id || !validator.isMongoId(decoded.id)) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    // Validate the user's role
    if (!['Employee', 'HR'].includes(decoded.role)) {
      return res.status(403).json({
        message: 'Unauthorized role',
      });
    }

    // Assign the decoded id, username, and role to req.user to be used in controllers
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };

    // Pass control to the next middleware function.
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
const hrAuthMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id; // Extract the user ID from the JWT payload

    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'HR') {
      console.log('Access denied. User role:', user.role);
      return res.status(403).json({ message: 'Access denied. HR role required.' });
    }

    console.log('HR access granted');
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error('Error in hrAuthMiddleware:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
module.exports = {validateJWT,hrAuthMiddleware};
