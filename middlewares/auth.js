const jwt = require("jsonwebtoken");
exports.isAuth = async (req, res, next) => {
  const authToken = req.header("Authentication");
  if (!authToken) {
    const error = new Error("No token,  authorization denied");
    error.statusCode = 401;
    throw error;
  }
  const token = authToken.split(" ")[1].trim();
  try {
    let decoded = jwt.verify(token, process.env.JwT_SECRET);
    req.isAuthenticated = true;
    req.user = { _id: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    throw error;
  }
};
