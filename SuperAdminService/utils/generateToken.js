const jwt = require('jsonwebtoken');

const generateToken = (userId, roleName) => {
  return jwt.sign({ id: userId, role: roleName }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = generateToken;
