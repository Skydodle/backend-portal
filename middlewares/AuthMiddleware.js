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

// This one verify the token and also check if token role is employee/HR
// We use this one for employee website. HR should also have access to employee website so
// we are not strictly checking for employee role only here.
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

// This one will validate the token and also strictly check if the token role is HR
// only HR role should be able to access HR site
// We should use this one for all HR protected routes
const validateHRJWT = (req, res, next) => {
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

    // Validate the user's role is HR
    if (decoded.role !== 'HR') {
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

module.exports = { validateJWT, validateHRJWT };
