const adminRouter = require("./admin");
const apiRouter = require("./api");
const authRouter = require("./auth");
const shopRouter = require("./shop");
const staffRouter = require("./staff");
const userRouter = require("./user");
const orderedRouter = require("./ordered");
const initRouter = (app) => {
  app.use("/", shopRouter);
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  app.use("/staff", staffRouter);
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
  app.use("/ordered", orderedRouter);
};

module.exports = initRouter;
