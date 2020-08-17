const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
/**
 * @route POST user/register
 * @desc create user account
 * @access public
 */
router.post("/register", userController.postUserRegister);
/**
 * @route POST user/login
 * @desc login user account
 * @access public
 */
router.post("/login", userController.postUserLogin);
module.exports = router;
