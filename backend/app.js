/* eslint-disable no-console */
/* eslint-disable quote-props */

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;
const token = jwt.sign(
  { _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
);
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const user = require("./models/user");

const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

console.log(token);

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.options("*", cors());

app.post("/signin", login);

app.post("/signup", createUser);

app.use(auth);

app.use("/cards", cardsRouter);

app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(500).send({ message: "An error occurred on the server" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// 6130f479d67ba2b07b3744e3
