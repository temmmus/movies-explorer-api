const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;

  try {
    // const token = req.headers.authorization;
    const token = req.headers.authorization.split(' ')[1];

    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    next(new UnauthorizedError('Доступ запрещен'));
  }

  req.user = payload;

  next();
};
