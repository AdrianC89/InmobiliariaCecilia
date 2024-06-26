const jwt = require('jsonwebtoken');
require('dotenv').config();

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

module.exports = {
  createAccessToken
};