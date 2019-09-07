const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'Error verifying token.',
          err: err.message
        });
      } else {
        req.user_id = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.', err: err.message });
  }
};
