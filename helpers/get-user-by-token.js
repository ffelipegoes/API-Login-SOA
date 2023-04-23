const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) return res.status(401).json({ error: 'Acesso negado!' });

  // find user
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded.id;
};

module.exports = getUserByToken;
