const CORS = (app) => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, UPDATE, DELETE, PATH, OPTIONS, PUT"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    }
    next();
  });
};

module.exports = CORS;
