"use strict";

var Staff = require("../models/staff");

var User = require("../models/user");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

exports.getAuthStaff = function _callee(req, res, next) {
  var error, staff;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.isAuthenticated) {
            _context.next = 5;
            break;
          }

          error = new Error("Unauthorized");
          error.statusCode = 401;
          throw error;

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(Staff.findById(req.user._id, {
            password: 0
          }));

        case 7:
          staff = _context.sent;
          res.status(200).json(staff);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.postLoginAuthStaff = function _callee2(req, res, next) {
  var _req$body, email, password, staff, error, comparePwd, _error, token, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Staff.findOne({
            email: email
          }));

        case 4:
          staff = _context2.sent;

          if (staff) {
            _context2.next = 9;
            break;
          }

          error = new Error("Email has not existed");
          error.statusCode = 404;
          throw error;

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, staff.password));

        case 11:
          comparePwd = _context2.sent;

          if (comparePwd) {
            _context2.next = 16;
            break;
          }

          _error = new Error("Email or password wasn't correct");
          _error.statusCode = 400;
          throw _error;

        case 16:
          token = jwt.sign({
            userId: staff._id,
            email: email
          }, process.env.JwT_SECRET, {
            expiresIn: +process.env.AUTH_EXP_DATE
          });
          user = staff._doc;
          delete user.password;
          res.status(200).json({
            token: token,
            user: user
          });
          _context2.next = 25;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.getAuthUser = function _callee3(req, res, next) {
  var err, user, _err, cloneUser;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (req.isAuthenticated) {
            _context3.next = 5;
            break;
          }

          err = new Error("Unauthorized");
          err.statusCode = 401;
          throw err;

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.user._id, {
            "local.password": 0
          }));

        case 7:
          user = _context3.sent;

          if (user) {
            _context3.next = 12;
            break;
          }

          _err = new Error("Somthing went wrong with user");
          _err.statusCode = 404;
          throw _err;

        case 12:
          cloneUser = user._doc;
          cloneUser.name = cloneUser.local.name || cloneUser.google.name || cloneUser.facebook.name;
          cloneUser.email = cloneUser.local.email || cloneUser.google.email || cloneUser.facebook.email;
          res.status(200).json(cloneUser);
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
};