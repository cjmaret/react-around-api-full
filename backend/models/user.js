const mongoose = require("mongoose");
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorer",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?.+#?/i.test(v);
      },
      message: "Invalid image URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    select: false,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?.+#?/i.test(v);
      },
      message: "Invalid password",
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
