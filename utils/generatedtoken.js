const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.generate = (userId,userEmail) => {
  const token = jwt.sign({ id: userId,email:userEmail }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_IN,
  });

  return token;
};
