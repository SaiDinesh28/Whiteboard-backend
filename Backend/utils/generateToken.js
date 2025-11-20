const jwt = require("jsonwebtoken");

const generateToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET);
};
module.exports = generateToken;