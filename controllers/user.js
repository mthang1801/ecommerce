const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
exports.postUserRegister = async (req, res, next) => {
  try {
    const errors = [];
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
      errors.push("Email is invalid");
    }
    if (!validator.isLength(name, { min: 6 })) {
      errors.push("Name too short, at least 6 characters");
    }
    if (!validator.isLength(password, { min: 6 })) {
      errors.push("Password too short, at least 6 characters");
    }
    if (errors.length) {
      const error = new Error("Register failed");
      error.data = errors;
      error.statusCode = 400;
      throw error;
    }
    const staff = await User.findOne({
      $or: [
        { "local.email": email },
        { "facebook.email": email },
        { "google.email": email },
      ],
    });
    if (staff) {
      const error = new Error("Email has been existing");
      error.statusCode = 400;
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, +process.env.SALT);
    const newUser = new User({
      local: {
        name,
        email,
        password: hashPassword,
      },
    });
    const createdUser = await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: +process.env.AUTH_EXP_DATE }
    );
    const expDate = +process.env.AUTH_EXP_DATE;
    const user = createdUser._doc;
    delete user.local.password;
    res.status(201).json({ token, user, expDate });
  } catch (error) {
    next(error);
  }
};

exports.postUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ "local.email": email });
    if (!user) {
      const err = new Error("Email or password was not correct");
      err.statusCode = 400;
      throw err;
    }
    const comparePwd = await bcrypt.compare(password, user.local.password);
    if (!comparePwd) {
      const err = new Error("Email or password was not correct");
      err.statusCode = 400;
      throw err;
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: +process.env.AUTH_EXP_DATE }
    );
    const expDate = +process.env.AUTH_EXP_DATE;
    const cloneUser = user._doc;
    delete cloneUser.local.password;
    res.status(200).json({ user: cloneUser, token, expDate });
  } catch (error) {
    next(error);
  }
};
