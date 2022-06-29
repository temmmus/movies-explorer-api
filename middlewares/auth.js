const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-err');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;

  try {
    // const token = req.headers.authorization;
    const token = req.headers.authorization.split(' ')[1];

    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ForbiddenError('Доступ запрещен'));
  }

  req.user = payload;

  next();
};
