const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = {
  genToken,
  validateToken
};

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1hr'
  };
  return jwt.sign(payload, secret, options);
}

function validateToken(req, res, next) {
  const token = req.get('authorization');
  if (token) {
    jwt.verify(token, secrets, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Error verifying token.', error: err });
      } else {
        req.user_id = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Please provide a token.' });
  }
}
