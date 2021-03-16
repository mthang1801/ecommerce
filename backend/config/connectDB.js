const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.Promise = require("bluebird");
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
