"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = userSaga;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("./user.actions"));

var productActions = _interopRequireWildcard(require("../seller/seller.actions"));

var _user2 = _interopRequireDefault(require("./user.types"));

var _axios = _interopRequireDefault(require("axios"));

var _urls = _interopRequireDefault(require("../../utils/urls"));

var _setAuthToken = _interopRequireDefault(require("../../utils/setAuthToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchUser),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(register),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(login),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(loginFacebook),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(loginGoogle),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(checkAuthTimeout),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(logout),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(onFetchUser),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(onRegister),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(onLogin),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(onLoginFacebook),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(onLoginGoogle),
    _marked13 =
/*#__PURE__*/
regeneratorRuntime.mark(onLogout),
    _marked14 =
/*#__PURE__*/
regeneratorRuntime.mark(onCheckAuthTimeout),
    _marked15 =
/*#__PURE__*/
regeneratorRuntime.mark(userSaga);

function fetchUser() {
  var timeRemain, _ref, data;

  return regeneratorRuntime.wrap(function fetchUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(!localStorage.userToken || !localStorage.userExpDate)) {
            _context.next = 3;
            break;
          }

          throw new Error("Authentication denied");

        case 3:
          if (!(!localStorage.userExpDate || Date.parse(localStorage.userExpDate) < Date.now())) {
            _context.next = 7;
            break;
          }

          localStorage.removeItem("userExpDate");
          localStorage.removeItem("userToken");
          throw new Error("Token has expired");

        case 7:
          (0, _setAuthToken["default"])(localStorage.userToken);
          timeRemain = Math.ceil(new Date(localStorage.userExpDate).getTime() - Date.now()) / 1000;
          _context.next = 11;
          return _axios["default"].get(_urls["default"].FETCH_USER_URL);

        case 11:
          _ref = _context.sent;
          data = _ref.data;
          _context.next = 15;
          return (0, _effects.put)(actions.fetchUserSuccess(data));

        case 15:
          console.log(timeRemain);
          _context.next = 18;
          return (0, _effects.put)(actions.checkAuthTimeout(timeRemain));

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          _context.next = 24;
          return (0, _effects.put)(actions.fetchUserFail());

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 20]]);
}

function register(_ref2) {
  var _ref2$payload, name, email, password, _ref3, _ref3$data, token, user, expDate;

  return regeneratorRuntime.wrap(function register$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref2$payload = _ref2.payload, name = _ref2$payload.name, email = _ref2$payload.email, password = _ref2$payload.password;
          _context2.prev = 1;
          console.log(_axios["default"].defaults.headers);
          _context2.next = 5;
          return _axios["default"].post(_urls["default"].REGISTER_URL, {
            name: name,
            email: email,
            password: password
          });

        case 5:
          _ref3 = _context2.sent;
          _ref3$data = _ref3.data;
          token = _ref3$data.token;
          user = _ref3$data.user;
          expDate = _ref3$data.expDate;
          localStorage.setItem("userToken", token);
          localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
          (0, _setAuthToken["default"])(token);
          _context2.next = 15;
          return (0, _effects.put)(actions.registerSuccess(user));

        case 15:
          _context2.next = 17;
          return (0, _effects.put)(actions.checkAuthTimeout(expDate));

        case 17:
          _context2.next = 24;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          _context2.next = 24;
          return (0, _effects.put)(actions.registerFail(_context2.t0.response.data.message));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 19]]);
}

function login(_ref4) {
  var _ref4$payload, email, password, _ref5, _ref5$data, token, user, expDate;

  return regeneratorRuntime.wrap(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _ref4$payload = _ref4.payload, email = _ref4$payload.email, password = _ref4$payload.password;
          _context3.prev = 1;
          console.log(email, password);
          _context3.next = 5;
          return _axios["default"].post(_urls["default"].LOGIN_URL, {
            email: email,
            password: password
          });

        case 5:
          _ref5 = _context3.sent;
          _ref5$data = _ref5.data;
          token = _ref5$data.token;
          user = _ref5$data.user;
          expDate = _ref5$data.expDate;
          localStorage.setItem("userToken", token);
          localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
          (0, _setAuthToken["default"])(token);
          _context3.next = 15;
          return (0, _effects.put)(actions.loginSuccess(user));

        case 15:
          _context3.next = 17;
          return (0, _effects.put)(actions.checkAuthTimeout(expDate));

        case 17:
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](1);
          _context3.next = 23;
          return (0, _effects.put)(actions.loginFail(_context3.t0.response.data.message));

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[1, 19]]);
}

function loginFacebook(_ref6) {
  var _ref6$payload, id, name, email, _ref7, _ref7$data, token, user, expDate;

  return regeneratorRuntime.wrap(function loginFacebook$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _ref6$payload = _ref6.payload, id = _ref6$payload.id, name = _ref6$payload.name, email = _ref6$payload.email;
          _context4.prev = 1;
          _context4.next = 4;
          return _axios["default"].post(_urls["default"].LOGIN_FB_URL, {
            id: id,
            name: name,
            email: email
          });

        case 4:
          _ref7 = _context4.sent;
          _ref7$data = _ref7.data;
          token = _ref7$data.token;
          user = _ref7$data.user;
          expDate = _ref7$data.expDate;
          localStorage.setItem("userToken", token);
          localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
          (0, _setAuthToken["default"])(token);
          _context4.next = 14;
          return (0, _effects.put)(actions.loginSuccess(user));

        case 14:
          _context4.next = 16;
          return (0, _effects.put)(actions.checkAuthTimeout(expDate));

        case 16:
          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](1);
          _context4.next = 22;
          return (0, _effects.put)(actions.loginFail(_context4.t0.response.data.message));

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[1, 18]]);
}

function loginGoogle(_ref8) {
  var _ref8$payload, id, name, email, _ref9, _ref9$data, token, user, expDate;

  return regeneratorRuntime.wrap(function loginGoogle$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _ref8$payload = _ref8.payload, id = _ref8$payload.id, name = _ref8$payload.name, email = _ref8$payload.email;
          _context5.prev = 1;
          console.log(name, email);
          _context5.next = 5;
          return _axios["default"].post(_urls["default"].LOGIN_GG_URL, {
            id: id,
            name: name,
            email: email
          });

        case 5:
          _ref9 = _context5.sent;
          _ref9$data = _ref9.data;
          token = _ref9$data.token;
          user = _ref9$data.user;
          expDate = _ref9$data.expDate;
          localStorage.setItem("userToken", token);
          localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
          (0, _setAuthToken["default"])(token);
          _context5.next = 15;
          return (0, _effects.put)(actions.loginSuccess(user));

        case 15:
          _context5.next = 17;
          return (0, _effects.put)(actions.checkAuthTimeout(expDate));

        case 17:
          _context5.next = 23;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 23;
          return (0, _effects.put)(actions.loginFail(_context5.t0.response.data.message));

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[1, 19]]);
}

function checkAuthTimeout(_ref10) {
  var payload;
  return regeneratorRuntime.wrap(function checkAuthTimeout$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          payload = _ref10.payload;
          _context6.next = 3;
          return (0, _effects.delay)(payload * 1000);

        case 3:
          _context6.next = 5;
          return (0, _effects.put)(actions.logoutStart());

        case 5:
          _context6.next = 7;
          return (0, _effects.call)(_setAuthToken["default"], null);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

function logout() {
  return regeneratorRuntime.wrap(function logout$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          localStorage.removeItem("userToken");
          localStorage.removeItem("userExpDate");
          _context7.next = 4;
          return (0, _effects.put)(actions.logoutSuccess());

        case 4:
          _context7.next = 6;
          return (0, _effects.put)(productActions.clearAll());

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}

function onFetchUser() {
  return regeneratorRuntime.wrap(function onFetchUser$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].FETCH_USER_START, fetchUser);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}

function onRegister() {
  return regeneratorRuntime.wrap(function onRegister$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].REGISTER_START, register);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}

function onLogin() {
  return regeneratorRuntime.wrap(function onLogin$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].LOGIN_START, login);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}

function onLoginFacebook() {
  return regeneratorRuntime.wrap(function onLoginFacebook$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].LOGIN_VIA_FACEBOOK_START, loginFacebook);

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}

function onLoginGoogle() {
  return regeneratorRuntime.wrap(function onLoginGoogle$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].LOGIN_VIA_GOOGLE_START, loginGoogle);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}

function onLogout() {
  return regeneratorRuntime.wrap(function onLogout$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].LOGOUT_START, logout);

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13);
}

function onCheckAuthTimeout() {
  return regeneratorRuntime.wrap(function onCheckAuthTimeout$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _effects.takeLatest)(_user2["default"].CHECK_AUTH_TIMEOUT, checkAuthTimeout);

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14);
}

function userSaga() {
  return regeneratorRuntime.wrap(function userSaga$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _effects.all)([(0, _effects.call)(onRegister), (0, _effects.call)(onLogout), (0, _effects.call)(onCheckAuthTimeout), (0, _effects.call)(onFetchUser), (0, _effects.call)(onLogin), (0, _effects.call)(onLoginFacebook), (0, _effects.call)(onLoginGoogle)]);

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked15);
}