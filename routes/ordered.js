const express = require("express");
const router = express.Router();
const orderedController = require("../controllers/ordered");
const { isAuth } = require("../middlewares/auth");
router.get("/", isAuth, orderedController.getOrderedList);
module.exports = router;
