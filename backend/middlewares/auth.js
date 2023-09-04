const jwt = require('jsonwebtoken');
const UnauthorizedStatus = require('../errors/UnauthorizedStatus');
const { SECRET_KEY = 'mesto' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedStatus('Необходима авторизация.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedStatus('Необходима авторизация.');
  }
  req.user = payload;
  next();
};
