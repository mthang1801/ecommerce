const express = require("express");
const multer = require("multer");
const path = require("path");
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const staffRouter = require("./routes/staff");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const connectDB = require("./config/connectDB");
const app = express();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") require("dotenv").config();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, UPDATE, DELETE, PATH, OPTIONS, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authentication");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(new Error("This file is not image file"), false);
    }
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 },
}).single("image");

app.use(uploadFile);
app.use("/", shopRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/staff", staffRouter);
app.use("/auth", authRouter);

//handle error
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;
  console.log(error);
  res.status(status).json({ message: message });
});
connectDB()
  .then((res) => {
    console.log("DB has been connected");
    app.listen(port, console.log(`server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
