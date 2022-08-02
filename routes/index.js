const routes = require('express').Router();
const {
  createUser, getUserInfo, patchUserInfo, login,
} = require('../controllers/users');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

routes.post('/signin', login);
routes.post('/signup', createUser);
routes.get('/me', getUserInfo);
routes.patch('/me', patchUserInfo);

routes.get('/movies', getMovies);
routes.post('/movies', createMovie);
routes.delete('/movies/:movieId', deleteMovie);

module.exports = routes;
