const express = require("express");
const configFileStorage = require("./config/fileStorage");
const path = require("path");
const initRouter = require("./routes");
const connectDB = require("./config/connectDB");
const configViewEngine = require("./config/viewEngine");
const CORS = require("./config/cors");
const handlerError = require("./config/handleError");
const compression = require("compression");
// const helmet = require("helmet");
// const morgan = require("morgan");
const fs = require("fs-extra");
const app = express();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
app.use(compression());
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// setup the logger
// app.use(morgan("combined", { stream: accessLogStream }));
//Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
// app.use(helmet());
//config view Engine
configViewEngine(app);

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 10000000,
  })
);

//Handler Access-Control-Allow-Origin
CORS(app);

//set up static file images
app.use("/images", express.static(path.join(__dirname, "images")));

//set up file storage
configFileStorage(app);

//init Router
initRouter(app);

//handle error
handlerError(app);

if (process.env.NODE_ENV === "production") {
  //set static
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
connectDB()
  .then((res) => {
    console.log("DB has been connected");
    app.listen(port, console.log(`server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
