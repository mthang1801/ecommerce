const express = require("express");
const configFileStorage = require("./config/fileStorage");
const path = require("path");
const initRouter = require("./routes");
const connectDB = require("./config/connectDB");
const configViewEngine = require("./config/viewEngine");
const CORS = require("./config/cors");
const handlerError = require("./config/handleError");
const app = express();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") require("dotenv").config();

//config view Engine
configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
connectDB()
  .then((res) => {
    console.log("DB has been connected");
    app.listen(port, console.log(`server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
