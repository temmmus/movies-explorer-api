const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo,
  patchUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), patchUserInfo);

module.exports = router;
