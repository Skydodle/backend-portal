const jwt = require('jsonwebtoken');
const validator = require('validator');

/**
 * Middleware to validate JWT.
 * This middleware will:
 * 1. Extract the token from the request (Header OR Cookie).
 * 2. Verify the token's validity.
 * 3. Assign decoded token data to the request.
 * 4. Pass control to the next middleware function.
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

module.exports = validateJWT;
