/* eslint-disable consistent-return */
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require("../errors/AuthorizationError");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const ConflictError = require("../errors/ConflictError");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, err) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(200).send({ _id: user._id, email: user.email });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        throw new ConflictError("User already exists!");
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorizationError("Not Authorized");
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User could not be found");
      } else {
        return res.status(200).send({ user });
      }
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  let userId = new mongoose.Types.ObjectId(req.params.id);
  User.findById(userId)
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      let userId = user._id.toString();
      if (!user) {
        throw new NotFoundError("User could not be found");
      } else if (userId !== req.user._id) {
        throw new ForbiddenError("That's not your profile, girl!");
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      let userId = user._id.toString();
      if (!user) {
        throw new NotFoundError("User could not be found");
      } else if (userId !== req.user._id) {
        throw new ForbiddenError("That's not your avatar, honey!");
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};
