const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = {
  genToken
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
