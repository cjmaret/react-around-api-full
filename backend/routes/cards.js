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

const validator = require("validator");

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error("Invalid URL");
  }
  return string;
}

router.get(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),

  getCards
);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateUrl),
    }),
  }),
  createCard
);

router.delete(
  "/:id",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteCard
);

router.put(
  "/likes/:cardId",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  likeCard
);

router.delete(
  "/likes/:cardId",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard
);

module.exports = router;
