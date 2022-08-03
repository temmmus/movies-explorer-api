const routes = require('express').Router();
const {
  createUser, getUserInfo, patchUserInfo, login,
} = require('../controllers/users');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.get('/users/me', auth, getUserInfo);
routes.patch('/users/me', auth, patchUserInfo);
routes.get('/movies', auth, getMovies);
routes.post('/movies', auth, createMovie);
routes.delete('/movies/:movieId', auth, deleteMovie);

module.exports = routes;
