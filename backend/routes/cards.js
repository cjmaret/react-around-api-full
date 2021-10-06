/* eslint-disable quote-props */
const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { celebrate, Joi } = require("celebrate");
import validator from "validator";

function validateUrl(string) {
  return validator.isURL(string);
}

router.get(
  "/",
  [
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateUrl),
        owner: Joi.required().min(2).max(30),
        likes: Joi.required().email(),
        createdAt: Joi.date(),
      }),
    }),
    auth,
  ],
  getCards
);

router.post(
  "/",
  [
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateUrl),
        owner: Joi.required().min(2).max(30),
        likes: Joi.required().email(),
        createdAt: Joi.date(),
      }),
    }),
    auth,
  ],
  createCard
);

router.delete(
  "/:id",
  [
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateUrl),
        owner: Joi.required().min(2).max(30),
        likes: Joi.required().email(),
        createdAt: Joi.date(),
      }),
    }),
    auth,
  ],
  deleteCard
);

router.put(
  "/:cardId/likes",
  [
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateUrl),
        owner: Joi.required().min(2).max(30),
        likes: Joi.required().email(),
        createdAt: Joi.date(),
      }),
    }),
    auth,
  ],
  likeCard
);

router.delete(
  "/:cardId/likes",
  [
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateUrl),
        owner: Joi.required().min(2).max(30),
        likes: Joi.required().email(),
        createdAt: Joi.date(),
      }),
    }),
    auth,
  ],
  dislikeCard
);

module.exports = router;
