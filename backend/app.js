/* eslint-disable no-console */
/* eslint-disable quote-props */

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use("/cards", cardsRouter);

app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.post("/signin", auth, login);

app.post("/signup", auth, createUser);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(500).send({ message: "An error occurred on the server" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// 6130f479d67ba2b07b3744e3