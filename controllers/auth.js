const Staff = require("../models/staff");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.getAuthStaff = async (req, res, next) => {
  try {
    if (!req.isAuthenticated) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const staff = await Staff.findById(req.user._id, { password: 0 });
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

exports.postLoginAuthStaff = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) {
      const error = new Error("Email has not existed");
      error.statusCode = 404;
      throw error;
    }
    const comparePwd = await bcrypt.compare(password, staff.password);
    if (!comparePwd) {
      const error = new Error("Email or password wasn't correct");
      error.statusCode = 400;
      throw error;
    }
    const token = jwt.sign(
      { userId: staff._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: "1h" }
    );
    const user = staff._doc;
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    if (!req.isAuthenticated) {
      const err = new Error("Unauthorized");
      err.statusCode = 401;
      throw err;
    }
    const user = await User.findById(req.user._id, { "local.password": 0 });
    if (!user) {
      const err = new Error("Somthing went wrong with user");
      err.statusCode = 404;
      throw err;
    }
    const cloneUser = user._doc;
    cloneUser.name =
      cloneUser.local.name || cloneUser.google.name || cloneUser.facebook.name;
    cloneUser.email =
      cloneUser.local.email ||
      cloneUser.google.email ||
      cloneUser.facebook.email;
    res.status(200).json(cloneUser);
  } catch (error) {
    next(error);
  }
};
