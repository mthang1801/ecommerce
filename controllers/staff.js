const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
exports.postRegister = async (req, res, next) => {
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
    const staff = await Staff.findOne({ email });
    if (staff) {
      const error = new Error("Email has been existing");
      error.statusCode = 400;
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({
      name,
      email,
      password: hashPassword,
    });
    const createdStaff = await newStaff.save();
    const token = jwt.sign(
      { userId: newStaff._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: "1h" }
    );
    const user = createdStaff._doc;
    delete user.password;
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};
