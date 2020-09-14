const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/ordered");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { restoreAccount } = require("../lang/vi");
const sendEmail = require("../config/mailer");
const { v4: uuid } = require("uuid");
const orderConfirmationEmail = require("../lang/vi");
const sendMail = require("../config/mailer");
const connectDB = require("../config/connectDB");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_gRVFD4jSoam6nmNkUzn1L3IP00uiTerqJ0");
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
    const user = await User.findOne({
      $or: [
        { "local.email": email },
        { "facebook.email": email },
        { "google.email": email },
      ],
    });

    if (user) {
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
      infomation: {
        email,
      },
    });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: +process.env.AUTH_EXP_DATE }
    );
    const expDate = +process.env.AUTH_EXP_DATE;
    const cloneUser = newUser._doc;
    delete cloneUser.local.password;
    cloneUser.name = name;
    cloneUser.email = email;
    res.status(201).json({ token, user: cloneUser, expDate });
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
    cloneUser.name = cloneUser.local.name;
    cloneUser.email = email;
    res.status(200).json({ user: cloneUser, token, expDate });
  } catch (error) {
    next(error);
  }
};

exports.postRestoreAccount = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ "local.email": email });
    if (!user) {
      const err = new Error("Email not found");
      err.statusCode = 404;
      throw err;
    }
    user.local.verify_token = uuid();
    user.local.expiration_token = new Date(
      Date.now() + process.env.RESTORE_ACCOUNT_EXP_DATE * 1000
    );
    const updatedUser = await user.save();
    const verifyLink = `${req.protocol}://${req.get("host")}/user/verify/${
      updatedUser.local.verify_token
    }`;
    await sendEmail(email, "Khôi phục tài khoản", restoreAccount(verifyLink));
    res.status(200).json({ msg: "account activated" });
  } catch (error) {
    next(error);
  }
};

exports.getRestoreAccount = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ "local.verify_token": token });
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    const checkExpirationDate = user.local.expiration_token;
    if (Date.now() > checkExpirationDate.getTime()) {
      const err = new Error("Token has expired");
      err.statusCode = 400;
      await user.save();
      throw err;
    }
    res.status(200).render("restore-account", {
      email: user.local.email,
      title: "Khôi phục tài khoản",
      token,
      error: undefined,
    });
  } catch (error) {
    next(error);
  }
};

exports.postUpdateAccount = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).render(`restore-account`, {
        error: "Mật khẩu không khớp với nhau",
        email,
        token,
        title: "Khôi phục tài khoản",
      });
    }
    const user = await User.findOne({
      "local.email": email,
      "local.verify_token": token,
    });
    if (!user) {
      return res.status(400).render(`restore-account`, {
        error:
          "Email bị thay đổi bởi người dùng, vui lòng không thay đổi tên email của bạn",
        email,
        token,
        title: "Khôi phục tài khoản",
      });
    }
    const hashPassword = await bcrypt.hash(password, +process.env.SALT);
    user.local.password = hashPassword;
    user.local.verify_token = undefined;
    user.local.expiration_token = undefined;
    await user.save();
    res.status(200).render("updated-account", {
      title: "Cập nhậ tài khoản thành công",
    });
  } catch (error) {
    next(error);
  }
};
exports.postUserLoginFacebook = async (req, res, next) => {
  try {
    const { id, name, email } = req.body;
    if (!id || !name || !email) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    let user = await User.findOne({ "facebook.id": id });
    if (!user) {
      user = new User({
        facebook: {
          id,
          name,
          email,
        },
      });
      await user.save();
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: +process.env.AUTH_EXP_DATE }
    );
    const expDate = +process.env.AUTH_EXP_DATE;
    const cloneUser = user._doc;
    cloneUser.name = name;
    cloneUser.email = email;
    res.status(200).json({ token, user: cloneUser, expDate });
  } catch (error) {
    next(error);
  }
};
exports.postUserLoginGoogle = async (req, res, next) => {
  try {
    const { id, name, email } = req.body;
    if (!id || !name || !email) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    let user = await User.findOne({ "google.id": id });
    if (!user) {
      user = new User({
        google: {
          id,
          name,
          email,
        },
      });
      await user.save();
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JwT_SECRET,
      { expiresIn: +process.env.AUTH_EXP_DATE }
    );
    const expDate = +process.env.AUTH_EXP_DATE;
    const cloneUser = user._doc;
    cloneUser.name = name;
    cloneUser.email = email;
    res.status(200).json({ token, user, expDate });
  } catch (error) {
    next(error);
  }
};
exports.putUpdateUserAsSeller = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const err = new Error("unauthorize");
      err.statusCode = 401;
      throw err;
    }
    const {
      firstName,
      lastName,
      address,
      phone,
      selectedCity,
      selectedDist,
      selectedWard,
      cardNumber,
      expiryDate,
      cvc,
      email,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    user.role = "seller";
    (user.information = {
      first_name: firstName,
      last_name: lastName,
      city: selectedCity.Title,
      district: selectedDist.Title,
      ward: selectedWard.Title,
      address: address,
      email: email || req.user.email,
      phone: phone,
      credit_card: {
        number: cardNumber,
        expDate: expiryDate,
        cvc: +cvc,
      },
    }),
      await user.save();
    res.status(200).json({ msg: "Updated success" });
  } catch (error) {
    next(error);
  }
};
exports.putUpdateInformation = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { userInfo } = req.body;
    const user = await User.findById(req.user._id);
    user.information = { ...userInfo };
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
exports.postPayment = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 404;
      throw error;
    }
    const {
      currentUser,
      cartItems,
      methodDelivery,
      userMessage,
      totalPrice,
      token,
    } = req.body;
    const { method } = req.params;
    if (
      !currentUser ||
      !currentUser.information.first_name ||
      !currentUser.information.last_name ||
      !currentUser.information.city ||
      !currentUser.information.district ||
      !currentUser.information.ward ||
      !currentUser.information.address ||
      !currentUser.information.email ||
      !currentUser.information.phone
    ) {
      const error = new Error("User information is invalid");
      error.statusCode = 400;
      throw error;
    }

    if (currentUser._id.toString() !== req.user._id.toString()) {
      const error = new Error("User not match");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const products = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
    }));
    const timeExpire =
      methodDelivery === "fast"
        ? new Date(+new Date() + 24 * 60 * 60 * 1000)
        : new Date(+new Date() + 24 * 7 * 60 * 60 * 1000);
    const newOrdered = new Order({
      user: req.user._id,
      products,
      method_delivery: methodDelivery,
      user_message: userMessage,
      time_expire: timeExpire,
      totalPrice,
    });
    if (method === "cod") {
      newOrdered.method_payment = method;
    } else if (method === "card") {
      newOrdered.method_payment = method;
      if (!token) {
        const error = new Error("Token is empty");
        error.statusCode = 400;
        throw error;
      }
      const body = {
        source: token.id,
        amount: +totalPrice,
        currency: "vnd",
      };

      const charge = await stripe.charges.create(
        body,
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            const error = new Error(stripeErr);
            error.statusCode = 400;
            throw error;
          }
        }
      );
    } else {
      const error = new Error("Method payment is invalid");
      error.statusCode = 400;
      throw error;
    }

    const conn = await connectDB();
    let session = await conn.startSession();
    session.startTransaction();
    for await (let productItem of products) {
      const product = await Product.findById(productItem);
      product.sold_quantity += productItem.quantity;
      await product.save();
    }
    user.ordered.push(newOrdered._id);
    await newOrdered.save();
    await user.save();
    await session.commitTransaction();

    return res.status(200).json(newOrdered);
  } catch (error) {
    next(error);
  }
};
