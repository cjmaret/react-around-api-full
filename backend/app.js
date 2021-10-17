/* eslint-disable no-console */
/* eslint-disable quote-props */

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
require("dotenv").config();
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/NotFoundError");

const app = express();

app.use(cors());
app.options("*", cors());

const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500,
});

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", login);

app.post("/signup", createUser);

app.use(auth);

app.use("/cards", cardsRouter);

app.use("/users", usersRouter);

app.get("*", (req, res) => {
  throw new NotFoundError("Requested resource not found");
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.statusCode === 500 ? "Server error" : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// 6130f479d67ba2b07b3744e3
