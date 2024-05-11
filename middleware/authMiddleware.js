const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ status: 'error', message: 'Invalid token' });
  }
};

module.exports = { authenticateToken };

