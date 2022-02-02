const jwt = require('jsonwebtoken');

const secret = 'fuckTwitter';
const expiration = '2h';

module.exports = {
//The signToken() function expects a user object and will add that user's username, email, and _id properties to the token
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};