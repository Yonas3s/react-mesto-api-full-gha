const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getUserById, editUserInfo, editUserAvatar, getMeUser,
} = require('../controllers/users');
const urlRegex = require('../utils/const');

router.get('/', getUsers);
router.get('/me', getMeUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), editUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex).required(),
  }),
}), editUserAvatar);

module.exports = router;
