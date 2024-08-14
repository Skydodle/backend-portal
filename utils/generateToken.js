const jwt = require('jsonwebtoken');

const generateToken = (id, username, role) => {
  try {
    const token = jwt.sign(
      { id, username, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

module.exports = generateToken;
