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
 * @desc get list district base on city id
 * @access public
 */
router.get("/city/:id/district", apiController.getListDistricts);

/**
 * @route GET /api/district/:id/ward
 * @desc get list wards base on district id
 * @access public
 */
router.get("/district/:id/ward", apiController.getListWards);
module.exports = router;
