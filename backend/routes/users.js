/* eslint-disable quote-props */
const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

const { validator } = require('validator');

function validateUrl(string) {
  return validator.isURL(string);
}

router.get('/', [celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  }), auth], getUsers);

router.get('/:id', [celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  }), auth], getUser);

router.patch('/me', [celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  }), auth], updateProfile);

router.patch('/me/avatar', [celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  }), auth], updateAvatar);

router.get('/me', [celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
  }), auth], getUser);

module.exports = router;
