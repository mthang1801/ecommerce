"use strict";

var adminRouter = require("./admin");

var apiRouter = require("./api");

var authRouter = require("./auth");

var shopRouter = require("./shop");

var staffRouter = require("./staff");

var userRouter = require("./user");

var initRouter = function initRouter(app) {
  app.use("/", shopRouter);
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  app.use("/staff", staffRouter);
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
};

module.exports = initRouter;