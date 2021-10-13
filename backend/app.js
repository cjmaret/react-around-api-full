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
const user = require("./models/user");

const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://www.cjmaret.students.nomoreparties.site"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

app.use(cors());
app.options("*", cors());

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
