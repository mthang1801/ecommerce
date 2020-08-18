const express = require("express");
const expressEjsExtend = require("express-ejs-extend");
const path = require("path");
/**
 * Config view engine express ejs
 *  @param app from exactly express module
 */

const configViewEngine = (app) => {
  app.use(
    express.static(path.join(path.dirname(require.main.filename), "public"))
  );
  app.engine("ejs", expressEjsExtend);
  app.set("view engine", "ejs");
  app.set("views", path.join(path.dirname(require.main.filename), "views"));
};

module.exports = configViewEngine;
