const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ServerError = require('../errors/server-err');

const { JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    // .then(() => {
    //   res.send({
    //     name, email,
    //   });
    // })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .send({ token })
        .end();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным email уже существует'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  console.log(req)
  console.log(req.user._id)
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, email } },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным email уже существует'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.login = (req, res, next) => {
  if (req.body.email == null || req.body.password == null) {
    next(new BadRequestError('Переданы некорректные данные при авторизации'));
  }

  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .send({ token })
        .end();
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильная почта или пароль'));
    });
};
