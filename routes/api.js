const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
/**
 * @route GET /api/city
 * @desc get list cities
 * @access public
 */
router.get("/city", apiController.getListCity);
/**
 * @route GET /api/city/:id/district
 * @desc get list cities
 * @access public
 */
router.get("/city/:id/district", apiController.getListDistricts);
module.exports = router;
