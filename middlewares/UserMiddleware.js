const validator = require('validator');

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
      .json({ message: 'Email must be in correct email form' });
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

const validateLoginUser = (req, res, next) => {
  const { identifier, password } = req.body;

  if (
    !identifier ||
    !password ||
    validator.isEmpty(identifier) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  // Check if identifier is email or username
  const isEmail = validator.isEmail(identifier);

  if (!isEmail && !validator.isAlphanumeric(identifier)) {
    return res
      .status(400)
      .json({
        message: 'Identifier must be a valid email or alphanumeric username!',
      });
  }

  // Sanitize inputs
  req.body.identifier = isEmail
    ? validator.normalizeEmail(identifier)
    : validator.escape(identifier);
  req.body.password = validator.escape(password);

  next();
};

module.exports = { validateNewUser, validateLoginUser };
