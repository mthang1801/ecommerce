const handleAPIError = (app) => {
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const data = error.data;
    const message = error.message;
    res.status(status).json({ message: message });
  });
};

module.exports = handleAPIError;
