"use strict";

var handleAPIError = function handleAPIError(app) {
  app.use(function (error, req, res, next) {
    console.log(error);
    var status = error.statusCode || 500;
    var data = error.data;
    var message = error.message;
    res.status(status).json({
      message: message
    });
  });
};

module.exports = handleAPIError;