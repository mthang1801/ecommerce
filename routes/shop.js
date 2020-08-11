const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/category", shopController.getCategoryList);

module.exports = router;
