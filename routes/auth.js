const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { isAuth } = require("../middlewares/auth");
/**
 * @routes get /auth/staff
 * @desc get staff authenticate via jwt
 * @access private
 */
router.get("/staff", isAuth, authController.getAuthStaff);
/**
 * @routes post /auth/staff
 * @desc login with email, password
 * @access public
 */
router.post("/staff", authController.postLoginAuthStaff);
module.exports = router;
