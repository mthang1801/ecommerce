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
/**
 * @route POST /user/restore-account
 * @desc restore account user
 * @access public
 */
router.post("/restore-account", userController.postRestoreAccount);
/**
 * @route POST /user/restore-account
 * @desc restore account user
 * @access private
 */
router.get("/verify/:token", userController.getRestoreAccount);
/**
 * @route POST /user/update-account
 * @desc execute update account user
 * @access private
 */
router.post("/verify/update-account", userController.postUpdateAccount);
module.exports = router;
