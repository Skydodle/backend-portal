const validator = require('validator');

// Middleware to validate new user registration
const validateNewUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    validator.isEmpty(username) ||
    validator.isEmpty(email) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  if (!validator.isLength(username, { min: 3, max: 15 })) {
    return res
      .status(400)
      .json({ message: 'Username must be between 3 and 15 characters!' });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: 'Email must be in correct email format!' });
  }

  if (!validator.isLength(email, { min: 5, max: 50 })) {
    return res
      .status(400)
      .json({ message: 'Email must be between 5 and 50 characters!' });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      message:
        'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.',
    });
  }

  // Sanitize inputs
  req.body.username = validator.escape(username);
  req.body.email = validator.normalizeEmail(email);
  req.body.password = validator.escape(password);

  next();
};

// Middleware to validate user login (Username and Password only)
const validateLoginUser = (req, res, next) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  // Sanitize inputs
  req.body.username = validator.escape(username);
  req.body.password = validator.escape(password);

  next();
};

module.exports = { validateNewUser, validateLoginUser };
