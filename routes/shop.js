const express = require("express");
const shopController = require("../controllers/shop");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();
/**
 * @route GET /initial-data
 * @desc get initial data
 * @access public
 */
router.get("/initial-data", shopController.getInitialData);
/**
 * @route GET /api/category
 * @desc get list categories
 * @access public
 */
router.get("/category", shopController.getCategoryList);
/**
 * @route GET /category/:id/product-type
 * @desc get list product types by category id
 * @access public
 */
router.get(
  "/category/:id/product-type",
  shopController.getListProductTypesByCategoryId
);
/**
 * @route GET /produc-types
 * @desc get list product types
 * @access public
 */
router.get("/product-types", shopController.getProductTypes);
/**
 * @route GET /produc-types/all
 * @desc get all list product types
 * @access public
 */
router.get("/product-types/:id", shopController.getProductTypesById);
/**
 * @route GET //list-links-product-types
 * @desc get list product types by linkUrl
 * @access public
 */
router.get(
  "/list-links-product-types",
  shopController.getListLinksProductTypes
);
/**
 * @route POST /product
 * @desc create product
 * @access private
 */
router.post("/product", isAuth, shopController.postCreateProduct);
module.exports = router;
