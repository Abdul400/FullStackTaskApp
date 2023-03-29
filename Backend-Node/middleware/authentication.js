const jwt = require('jsonwebtoken');
const { unauthorizedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    throw new unauthorizedError('Authentication is Invalid');
  }
  const token = bearerToken.split(' ')[1];
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  req.user = { username: payload.username, id: payload.userId };
  next();
};

module.exports = authenticationMiddleware;
