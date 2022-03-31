const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ROUNDS = process.env.SALT_ROUNDS;

const userSchema = new Schema(
  {
    // _id: {
    //   type: String,
    //   default: uuidv4.v4,
    //   unique: true,
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    userFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    userLastName: {
      type: String,
      required: false,
      trim: true,
    },
    plants: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(ROUNDS, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.passwordVerify = function (passwordEntered, cb) {
  bcrypt.compare(passwordEntered, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = model("User", userSchema);

module.exports = User;
