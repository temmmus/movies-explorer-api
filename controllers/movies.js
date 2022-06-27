const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
    Movie.find({})
    .then((movies) => res.send(movies))
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN } = req.body;
  const owner = req.user._id;

  Movie.create({
    country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN, owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
    Movie.findById({ _id: req.params.movieId })
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError('Фильм по указанному id не найден'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Невозможно удалить чужой фильм'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};
