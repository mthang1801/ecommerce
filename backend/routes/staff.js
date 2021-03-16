const express = require("express");
const staffController = require("../controllers/staff");
const router = express.Router();
router.post("/register", staffController.postRegister);
module.exports = router;
