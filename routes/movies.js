const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
    getMovies,
    createMovie,
    deleteMovie
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.string(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    trailer: Joi.string(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    thumbnail: Joi.string(),
    movieId: Joi.string(),
  }),
}), createMovie);
router.delete('/:deleteMovie', celebrate({
    params: Joi.object().keys({
        deleteMovie: Joi.string().alphanum().length(24),
    }),
  }), deleteMovie);

module.exports = router;
