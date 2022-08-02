const routes = require('express').Router();
const {
  createUser, getUserInfo, patchUserInfo, login,
} = require('../controllers/users');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

routes.post('/signin', login);
routes.post('/signup', createUser);
routes.get('/users/me', getUserInfo);
routes.patch('/users/me', patchUserInfo);

routes.get('/movies', getMovies);
routes.post('/movies', createMovie);
routes.delete('/movies/:movieId', deleteMovie);

module.exports = routes;
